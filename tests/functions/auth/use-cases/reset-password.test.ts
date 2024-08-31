import { ResetPassword } from "../../../../netlify/functions/auth/use-cases";
import { ResetPasswordDto } from "../../../../netlify/functions/auth/dtos";
import { EmailService, UserService } from "../../../../netlify/services";

import { usersTable } from "../../../../netlify/data/schemas/user.schema";

import { envs } from "../../../../netlify/config/envs";
import { JwtAdapter } from "../../../../netlify/config/adapters";
import { HEADERS } from "../../../../netlify/config/utils";

jest.mock("../../../../netlify/config/adapters");
jest.mock("../../../../netlify/services");

describe("Probar caso de uso ResetPassword", () => {
  let resetPasswordUserUseCase: ResetPassword;
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
    resetPasswordUserUseCase = new ResetPassword(
      userServiceMock,
      emailServiceMock
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Debería devolver 400 si el usuario no existe", async () => {
    userServiceMock.findOne.mockResolvedValue(undefined);

    const dto: ResetPasswordDto = {
      email: "nonexistent@example.com",
    };
    const response = await resetPasswordUserUseCase.execute(dto);

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

  test("Debería devolver 500 si ocurre un error generando el token de validación", async () => {
    const mockUser = {
      id: 1,
      email: "test@example.com",
    };

    const dto: ResetPasswordDto = {
      email: "test@example.com",
    };


    userServiceMock.findOne.mockResolvedValue(mockUser);
    (JwtAdapter.generateToken as jest.Mock).mockResolvedValue(null);

    const response = await resetPasswordUserUseCase.execute(dto);

    expect(emailServiceMock.sendEmail).not.toHaveBeenCalled();

    expect(response).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        message: "Error generando token de cambio de contraseña",
      }),
      headers: HEADERS.json,
    });
  });

  test("Debería devolver 500 si ocurre un error enviando el email de validación", async () => {
     const mockUser = {
       id: 1,
       email: "test@example.com",
     };
    
    const dto: ResetPasswordDto = {
      email: "test@example.com",
    };

    const mockToken = "valid_token";

    userServiceMock.findOne.mockResolvedValue(mockUser);
    emailServiceMock.sendEmail.mockResolvedValue(false);
    (JwtAdapter.generateToken as jest.Mock).mockResolvedValue(mockToken);

    const response = await resetPasswordUserUseCase.execute(dto);

    expect(emailServiceMock.sendEmail).toHaveBeenCalled();

    expect(response).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        message: "Error enviando email de cambio de contraseña",
      }),
      headers: HEADERS.json,
    });
  });

  test("Debería devolver 200 si el usuario es registrado exitosamente", async () => {
    const mockUser = {
      id: 1,
      email: "test@example.com",
    };

    const dto: ResetPasswordDto = {
      email: "test@example.com",
    };

    const mockToken = "valid_token";

    userServiceMock.findOne.mockResolvedValue(mockUser);
    emailServiceMock.sendEmail.mockResolvedValue(true);
    (JwtAdapter.generateToken as jest.Mock).mockResolvedValue(mockToken);

    const response = await resetPasswordUserUseCase.execute(dto);

    expect(emailServiceMock.sendEmail).toHaveBeenCalled();
    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        message: "Hemos enviado un email con las instrucciones",
      }),
      headers: HEADERS.json,
    });
  });
});
