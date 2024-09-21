import { CheckUserToken } from "../../../../netlify/functions/auth/use-cases";
import { UserService } from "../../../../netlify/services";

import { usersTable } from "../../../../netlify/data/schemas/user.schema";

import { JwtAdapter } from "../../../../netlify/config/adapters";
import { HEADERS } from "../../../../netlify/config/utils";

jest.mock("../../../../netlify/config/adapters");
jest.mock("../../../../netlify/services");

describe("Probar caso de uso CheckUserToken", () => {
  let checkUserTokenUseCase: CheckUserToken;
  let userServiceMock: jest.Mocked<UserService>;

  beforeEach(() => {
    userServiceMock = new UserService() as jest.Mocked<UserService>;
    checkUserTokenUseCase = new CheckUserToken(userServiceMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Debería devolver 401 si el token proporcionado es inválido", async () => {
    (JwtAdapter.validateToken as jest.Mock).mockResolvedValue(null);

    const mockToken = "invalid_token";

    const response = await checkUserTokenUseCase.execute(mockToken);

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

    const response = await checkUserTokenUseCase.execute(mockToken);

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

    const response = await checkUserTokenUseCase.execute(mockToken);

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

  test("Debería devolver 200 si se valida el token de usuario", async () => {
    const mockUser = {
      id: 1,
      name: "Test User",
      lastName: "Test Last Name",
      username: "testuser",
      email: "user@example.com",
      password: "hashed_password",
      emailValidated: true,
    };

    const mockToken = "valid_token";

    (JwtAdapter.validateToken as jest.Mock).mockResolvedValue(mockUser);
    userServiceMock.findOne.mockResolvedValue(mockUser);

    const response = await checkUserTokenUseCase.execute(mockToken);

    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        message: "Token válido",
      }),
      headers: HEADERS.json,
    });
  });
});
