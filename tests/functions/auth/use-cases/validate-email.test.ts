import { ValidateEmail } from "../../../../netlify/functions/auth/use-cases";
import { UserService } from "../../../../netlify/services";

import { usersTable } from "../../../../netlify/data/schemas/user.schema";

import { JwtAdapter } from "../../../../netlify/config/adapters";
import { HEADERS } from "../../../../netlify/config/utils";

jest.mock("../../../../netlify/config/adapters");
jest.mock("../../../../netlify/services");

describe("Probar caso de uso ValidateEmail", () => {
  let validateEmailUseCase: ValidateEmail;
  let userServiceMock: jest.Mocked<UserService>;

  beforeEach(() => {
    userServiceMock = new UserService() as jest.Mocked<UserService>;
    validateEmailUseCase = new ValidateEmail(userServiceMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockUser = {
    id: 1,
    name: "Test User",
    lastName: "Test Last Name",
    username: "testuser",
    email: "test@example.com",
    password: "password123",
  };

  test("Debería devolver 401 si el token proporcionado es inválido", async () => {
    (JwtAdapter.validateToken as jest.Mock).mockResolvedValue(null);

    const mockToken = "invalid_token";

    const response = await validateEmailUseCase.execute(mockToken);

    expect(response).toEqual({
      statusCode: 401,
      body: JSON.stringify({ message: "Token inválido" }),
      headers: HEADERS.json,
    });
  });

  test("Debería devolver 400 si el email no se encuentra en el token decodificado", async () => {
    const mockPayload = {};

    (JwtAdapter.validateToken as jest.Mock).mockResolvedValue(mockPayload);

    const mockToken = "valid_token";

    const response = await validateEmailUseCase.execute(mockToken);

    expect(response).toEqual({
      statusCode: 400,
      body: JSON.stringify({ message: "Email no encontrado en el token" }),
      headers: HEADERS.json,
    });
  });

  test("Debería devolver 400 si el email no se encuentra en el token decodificado", async () => {
    const mockPayload = {
      email: "test@example.com",
    };

    (JwtAdapter.validateToken as jest.Mock).mockResolvedValue(mockPayload);

    const mockToken = "valid_token";

    const response = await validateEmailUseCase.execute(mockToken);

    expect(userServiceMock.findOne).toHaveBeenCalledWith(
      usersTable.email,
      mockPayload.email
    );

    expect(response).toEqual({
      statusCode: 400,
      body: JSON.stringify({ message: "Usuario no encontrado" }),
      headers: HEADERS.json,
    });
  });

  test("Debería devolver 200 si se valida correctamente el email del usuario registrado", async () => {
    const mockToken = "valid_token";

    (JwtAdapter.validateToken as jest.Mock).mockResolvedValue(mockUser);
    userServiceMock.findOne.mockResolvedValue(mockUser);

    const response = await validateEmailUseCase.execute(mockToken);

    expect(userServiceMock.update).toHaveBeenCalledWith(
      { emailValidated: true },
      usersTable.email,
      mockUser.email
    );
    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        message: "Usuario confirmado correctamente",
      }),
      headers: HEADERS.json,
    });
  });

  test("Debería devolver 500 si ocurre un error durante la actualización del usuario", async () => {
    const mockToken = "valid_token";
    // const mockUser = { email: "test@example.com" };

    (JwtAdapter.validateToken as jest.Mock).mockResolvedValue(mockUser);
    userServiceMock.findOne.mockResolvedValue(mockUser);
    
    // Simular un error en la actualización del usuario
    const mockError = new Error("Error en la actualización del usuario");
    userServiceMock.update.mockRejectedValue(mockError);

    const response = await validateEmailUseCase.execute(mockToken);

    expect(userServiceMock.update).toHaveBeenCalledWith(
      { emailValidated: true },
      usersTable.email,
      mockUser.email
    );

    expect(response).toEqual({
      statusCode: 500,
      body: JSON.stringify({ message: "Error en la actualización del usuario" }),
      headers: HEADERS.json,
    });
  });
});
