import { LoginUser } from "../../../../netlify/functions/auth/use-cases";
import { LoginUserDto } from "../../../../netlify/functions/auth/dtos";

import { UserService } from "../../../../netlify/services";

import { BcriptAdapter, JwtAdapter } from "../../../../netlify/config/adapters";
import { HEADERS } from "../../../../netlify/config/utils";

import { usersTable } from "../../../../netlify/data/schemas/user.schema";

jest.mock("../../../../netlify/services");
jest.mock("../../../../netlify/config/adapters");

describe("Probar caso de uso LoginUser", () => {
  let userServiceMock: jest.Mocked<UserService>;
  let loginUserUseCase: LoginUser;

  beforeEach(() => {
    // Aseguramos que el mock esté configurado antes de cada prueba
    userServiceMock = new UserService() as jest.Mocked<UserService>;
    loginUserUseCase = new LoginUser(userServiceMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Debería devolver 400 si el usuario no existe", async () => {
    // Simulamos que findOne devuelve undefined (usuario no encontrado)
    userServiceMock.findOne.mockResolvedValue(undefined);

    const dto: LoginUserDto = {
      email: "nonexistent@example.com",
      password: "password",
    };
    const response = await loginUserUseCase.execute(dto);

    expect(userServiceMock.findOne).toHaveBeenCalledWith(
      usersTable.email,
      dto.email
    );
    expect(response).toEqual({
      statusCode: 400,
      body: JSON.stringify({ message: "El usuario no existe" }),
      headers: HEADERS.json,
    });
  });

  test("debería devolver 403 si el email no ha sido validado", async () => {
    const mockUser = {
      email: "user@example.com",
      password: "hashed_password",
      emailValidated: false,
    };
    userServiceMock.findOne.mockResolvedValue(mockUser);

    const dto: LoginUserDto = {
      email: "user@example.com",
      password: "password",
    };
    const response = await loginUserUseCase.execute(dto);

    expect(userServiceMock.findOne).toHaveBeenCalledWith(
      usersTable.email,
      dto.email
    );
    expect(response).toEqual({
      statusCode: 403,
      body: JSON.stringify({ message: "Tu cuenta no ha sido confirmada" }),
      headers: HEADERS.json,
    });
  });

  test("Debería devolver 400 si la contraseña es incorrecta", async () => {
    const mockUser = {
      email: "user@example.com",
      password: "hashed_password",
      emailValidated: true,
    };

    const dto: LoginUserDto = {
      email: "user@example.com",
      password: "wrong_password",
    };

    userServiceMock.findOne.mockResolvedValue(mockUser);
    (BcriptAdapter.compare as jest.Mock).mockReturnValue(false);

    const response = await loginUserUseCase.execute(dto);

    expect(BcriptAdapter.compare).toHaveBeenCalledWith(
      dto.password,
      mockUser.password
    );
    expect(response).toEqual({
      statusCode: 400,
      body: JSON.stringify({ message: "El password es incorrecto" }),
      headers: HEADERS.json,
    });
  });

  test("Debería devolver 500 si hay un error al generar el token", async () => {
    const mockUser = {
      email: "user@example.com",
      password: "hashed_password",
      emailValidated: true,
    };
    const dto: LoginUserDto = {
      email: "user@example.com",
      password: "correct_password",
    };

    userServiceMock.findOne.mockResolvedValue(mockUser);

    (BcriptAdapter.compare as jest.Mock).mockReturnValue(true);
    (JwtAdapter.generateToken as jest.Mock).mockResolvedValue(null);

    const response = await loginUserUseCase.execute(dto);

    expect(response).toEqual({
      statusCode: 500,
      body: JSON.stringify({ message: "Error generando token" }),
      headers: HEADERS.json,
    });
  });

  test("Debería devolver 200 y el token si las credenciales son correctas", async () => {
    const mockUser = {
      email: "user@example.com",
      password: "hashed_password",
      emailValidated: true,
    };
    const { email, emailValidated } = mockUser;

    const mockToken = "valid_token";
    const mockTokenExpiration = "3d";

    userServiceMock.findOne.mockResolvedValue(mockUser);

    (BcriptAdapter.compare as jest.Mock).mockReturnValue(true);
    (JwtAdapter.generateToken as jest.Mock).mockResolvedValue(mockToken);

    const dto: LoginUserDto = {
      email: "user@example.com",
      password: "correct_password",
    };
    const response = await loginUserUseCase.execute(dto);

    expect(JwtAdapter.generateToken).toHaveBeenCalledWith(
      { email: mockUser.email },
      mockTokenExpiration
    );
    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        user: { email, emailValidated },
        token: mockToken,
      }),
      headers: HEADERS.json,
    });
  });
});
