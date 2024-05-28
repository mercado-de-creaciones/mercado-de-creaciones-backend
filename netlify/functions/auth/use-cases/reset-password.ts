import { db } from "../../../data/db";
import { usersTable } from "../../../data/schemas/user.schema";

import { EmailService } from "../../../services";
import { ResetPasswordDto } from "../dtos";

import { JwtAdapter } from "../../../config/adapters";
import { HEADERS } from "../../../config/utils";
import { envs } from "../../../config/envs";

import { HandlerResponse } from "@netlify/functions";
import { eq } from "drizzle-orm";

interface ResetPasswordUseCase {
  execute: (dto: ResetPasswordDto) => Promise<HandlerResponse>;
}

export class ResetPassword implements ResetPasswordUseCase {
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

  private async sendPasswordValidation(email: string, userName: string) {
    const token = await JwtAdapter.generateToken({ email });
    if (!token)
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Error generando token de cambio de contraseña",
        }),
        headers: HEADERS.json,
      };

    const link = `${envs.FRONTEND_URL}/olvide-password/${token}`;

    const htmlBody = /*html*/ `
      <p>Hola: ${userName}, ¿olvidaste tu contraseña?</p>
      <p>
        Para cambiar tu contraseña, haz click en el siguiente enlace:
        <a href="${link}">Cambiar Contraseña</a>
      </p>

      <p>Si tu no solicitaste este cambio, puedes ignorar este mensaje</p>
    `;

    const options = {
      to: email,
      subject: "Mercado de Creaciones - Cambio de Contraseña",
      htmlBody,
    };

    const isSent = this.emailService.sendEmail(options);
    if (!isSent)
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Error enviando email de cambio de contraseña",
        }),
        headers: HEADERS.json,
      };

    return true;
  }

  public async execute(dto: ResetPasswordDto): Promise<HandlerResponse> {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, dto.email));

    if (!user)
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "El usuario no existe",
        }),
        headers: HEADERS.json,
      };

    await this.sendPasswordValidation(user.email, user.name);

    try {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Hemos enviado un email con las instrucciones",
        }),
        headers: HEADERS.json,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: error,
        }),
        headers: HEADERS.json,
      };
    }
  }
}
