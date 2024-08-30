import { RegisterUser } from "../../../../netlify/functions/auth/use-cases";
import { RegisterUserDto } from "../../../../netlify/functions/auth/dtos";
import { EmailService, UserService } from "../../../../netlify/services";

import { usersTable } from "../../../../netlify/data/schemas/user.schema";

import { envs } from "../../../../netlify/config/envs";
import { BcriptAdapter, JwtAdapter } from "../../../../netlify/config/adapters";
import { HEADERS } from "../../../../netlify/config/utils";

jest.mock("../../../../netlify/config/adapters");
jest.mock("../../../../netlify/services");

describe("Probar caso de uso RegisterUser", () => {
  let registerUserUseCase: RegisterUser;
  let userServiceMock: jest.Mocked<UserService>;
  let emailServiceMock: jest.Mocked<EmailService>;

  const emailServiceOptions = {
    mailerHost: envs.MAILER_HOST,
    mailerPort: envs.MAILER_PORT,
    mailerUser: envs.MAILER_USER,
    senderEmailPassword: envs.MAILER_SECRET_KEY,
    postToProvider: envs.SEND_EMAIL,
  };

  beforeEach(() => {
    userServiceMock = new UserService() as jest.Mocked<UserService>;
    emailServiceMock = new EmailService(
      emailServiceOptions
    ) as jest.Mocked<EmailService>;
    registerUserUseCase = new RegisterUser(userServiceMock, emailServiceMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Debería devolver 400 si el usuario ya está registrado", async () => {
    const mockUser = {
      id: 1,
      email: "test@example.com",
    };

    const dto: RegisterUserDto = {
      email: "test@example.com",
      password: "password123",
      name: "Test User",
    };

    userServiceMock.findOne.mockResolvedValue(mockUser);

    const response = await registerUserUseCase.execute(dto);

    expect(userServiceMock.findOne).toHaveBeenCalledWith(
      usersTable.email,
      dto.email
    );
    expect(response).toEqual({
      statusCode: 400,
      body: JSON.stringify({ message: "Usuario ya registrado" }),
      headers: HEADERS.json,
    });
  });

  test("Debería devolver 500 si ocurre un error generando el token de validación", async () => {
    const dto: RegisterUserDto = {
      email: "test@example.com",
      password: "password123",
      name: "Test User",
    };

    userServiceMock.findOne.mockResolvedValue(undefined);
    (JwtAdapter.generateToken as jest.Mock).mockResolvedValue(null);

    const response = await registerUserUseCase.execute(dto);

    expect(emailServiceMock.sendEmail).not.toHaveBeenCalled();

    expect(response).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        message: "Error generando token de validación de cuenta",
      }),
      headers: HEADERS.json,
    });
  });

  test("Debería devolver 500 si ocurre un error enviando el email de validación", async () => {
    const dto: RegisterUserDto = {
      email: "test@example.com",
      password: "password123",
      name: "Test User",
    };

    const mockToken = "valid_token";

    userServiceMock.findOne.mockResolvedValue(undefined);
    emailServiceMock.sendEmail.mockResolvedValue(false);
    (JwtAdapter.generateToken as jest.Mock).mockResolvedValue(mockToken);

    const response = await registerUserUseCase.execute(dto);

    expect(emailServiceMock.sendEmail).toHaveBeenCalled();

    expect(response).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        message: "Error enviando email de validación de cuenta",
      }),
      headers: HEADERS.json,
    });
  });

  test("Debería devolver 200 si el usuario es registrado exitosamente", async () => {
    const dto: RegisterUserDto = {
      email: "test@example.com",
      password: "password123",
      name: "Test User",
    };

    const mockToken = "valid_token";
    const mockHashPassword = "hash_password";

    userServiceMock.findOne.mockResolvedValue(undefined);
    emailServiceMock.sendEmail.mockResolvedValue(true);
    (JwtAdapter.generateToken as jest.Mock).mockResolvedValue(mockToken);
    (BcriptAdapter.hash as jest.Mock).mockReturnValue(mockHashPassword);

    const response = await registerUserUseCase.execute(dto);

    expect(emailServiceMock.sendEmail).toHaveBeenCalled();
    expect(userServiceMock.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        email: dto.email,
        name: dto.name,
        password: expect.any(String),
      })
    );
    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        message:
          "Usuario creado correctamente, revisa tu email para confirmar tu cuenta",
      }),
      headers: HEADERS.json,
    });
  });
});
