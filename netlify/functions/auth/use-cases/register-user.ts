import { db } from "../../../data/db";
import { usersTable } from "../../../data/schemas/user.schema";

import { EmailService } from "../../../services";
import { RegisterUserDto } from "../dtos";
import { HEADERS } from "../../../config/utils";
import { BcriptAdapter, JwtAdapter } from "../../../config/adapters";
import { envs } from "../../../config/envs";

import { HandlerResponse } from "@netlify/functions";
import { eq } from "drizzle-orm";

interface RegisterUserUseCase {
  execute(dto: RegisterUserDto): Promise<HandlerResponse>;
}

export class RegisterUser implements RegisterUserUseCase {
  constructor(
    public readonly emailService: EmailService = new EmailService(
      envs.MAILER_HOST,
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_PORT,
      envs.MAILER_SECRET_KEY,
      envs.SEND_EMAIL
    )
  ) {}

  private sendUserValidation = async (email: string, userName: string) => {
    const token = await JwtAdapter.generateToken({ email });
    if (!token)
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Error generando token de validación de cuenta",
        }),
        headers: {
          ...HEADERS.json,
          ...HEADERS.cors,
        },
      };

    const link = `${envs.FRONTEND_URL}/confirmar/${token}`;
    const htmlBody = /*html*/ `
      <p>Hola: ${userName}, comprueba tu cuenta en Mercado de Creaciones</p>
      <p>
        Tu cuenta ya está casi lista, solo debes comprobarla  en siguiente enlace:
        <a href="${link}">Comprobar Cuenta</a>
      </p>

      <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
    `;

    const options = {
      to: email,
      subject: "Mercado de Creaciones - Productos de mascotas",
      htmlBody,
    };

    const isSent = this.emailService.sendEmail(options);
    if (!isSent)
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Error enviando email de validación de cuenta",
        }),
        headers: {
          ...HEADERS.json,
          ...HEADERS.cors,
        },
      };

    return true;
  };

  public async execute(dto: RegisterUserDto): Promise<HandlerResponse> {
    const existUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, dto.email));

    if (existUser.length > 0)
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Usuario ya registrado",
        }),
        headers: {
          ...HEADERS.json,
          ...HEADERS.cors,
        },
      };

    try {
      const password = BcriptAdapter.hash(dto.password);

      await Promise.all([
        db.insert(usersTable).values({ ...dto, password }),
        this.sendUserValidation(dto.email, dto.name),
      ]);

      return {
        statusCode: 200,
        body: JSON.stringify({
          message:
            "Usuario creado correctamente, revisa tu email para confirmar tu cuenta",
        }),
        headers: {
          ...HEADERS.json,
          ...HEADERS.cors,
        },
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: error,
        }),
        headers: {
          ...HEADERS.json,
          ...HEADERS.cors,
        },
      };
    }
  }
}
