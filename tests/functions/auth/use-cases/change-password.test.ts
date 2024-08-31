import { ChangePassword } from "../../../../netlify/functions/auth/use-cases";
import { ChangePasswordDto } from "../../../../netlify/functions/auth/dtos";
import { UserService } from "../../../../netlify/services";

import { usersTable } from "../../../../netlify/data/schemas/user.schema";

import { BcriptAdapter, JwtAdapter } from "../../../../netlify/config/adapters";
import { HEADERS } from "../../../../netlify/config/utils";

jest.mock("../../../../netlify/config/adapters");
jest.mock("../../../../netlify/services");

describe("Probar caso de uso ChangePassword", () => {
  let changePasswordUseCase: ChangePassword;
  let userServiceMock: jest.Mocked<UserService>;

  const newPassword = "new_password";

  beforeEach(() => {
    userServiceMock = new UserService() as jest.Mocked<UserService>;
    changePasswordUseCase = new ChangePassword(userServiceMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Debería devolver 401 si el token proporcionado es inválido", async () => {
    (JwtAdapter.validateToken as jest.Mock).mockResolvedValue(null);

    const mockToken = "invalid_token";

    const response = await changePasswordUseCase.execute(mockToken,newPassword);

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

    const response = await changePasswordUseCase.execute(mockToken,newPassword);

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

    const response = await changePasswordUseCase.execute(mockToken,newPassword);

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

  test("Debería devolver 200 si se cambia la contraseña correctamente", async () => {
    const mockUser = {
      id: 1,
      email: "test@example.com",
    };

    const mockToken = "valid_token";
    const mockHashPassword = "hash_password";

    (JwtAdapter.validateToken as jest.Mock).mockResolvedValue(mockUser);
    (BcriptAdapter.hash as jest.Mock).mockReturnValue(mockHashPassword);
    userServiceMock.findOne.mockResolvedValue(mockUser);

    const response = await changePasswordUseCase.execute(mockToken, newPassword);

    expect(userServiceMock.update).toHaveBeenCalledWith(
      { password: mockHashPassword },
      usersTable.email,
      mockUser.email
    );
    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        message: "Password modificado correctamente",
      }),
      headers: HEADERS.json,
    });
  });

  test("Debería devolver 500 si ocurre un error durante el cambio de contraseña", async () => {
    const mockToken = "valid_token";
    const mockHashPassword = "hash_password";
    const mockUser = { email: "test@example.com" };

    (JwtAdapter.validateToken as jest.Mock).mockResolvedValue(mockUser);
    userServiceMock.findOne.mockResolvedValue(mockUser);

    const mockError = new Error("Error en el cambio de contraseña");
    userServiceMock.update.mockRejectedValue(mockError);

    const response = await changePasswordUseCase.execute(mockToken,newPassword);

    expect(userServiceMock.update).toHaveBeenCalledWith(
      { password: mockHashPassword },
      usersTable.email,
      mockUser.email
    );

    expect(response).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        message: "Error en el cambio de contraseña",
      }),
      headers: HEADERS.json,
    });
  });
});
