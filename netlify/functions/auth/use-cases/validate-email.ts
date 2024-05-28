import { HEADERS, Validators } from "../../../config/utils";

import { HandlerResponse } from "@netlify/functions";
import { db } from "../../../data/db";
import { SelectUser, usersTable } from "../../../data/schemas/user.schema";
import { eq } from "drizzle-orm";
import { EmailResponse } from "../../../interfaces/response.interface";
import { JwtAdapter } from "../../../config/adapters";

interface ValidateEmailUseCase {
  execute(token: string): Promise<HandlerResponse>;
}

export class ValidateEmail implements ValidateEmailUseCase {
  public async execute(token: string): Promise<HandlerResponse> {
    const payload = await JwtAdapter.validateToken<EmailResponse>(token);

    if (!payload)
      return {
        statusCode: 401,
        body: JSON.stringify({
          message: "Token inválido",
        }),
        headers: HEADERS.json,
      };

    const { email } = payload;
    if (!email)
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Email no encontrado en el token",
        }),
        headers: HEADERS.json,
      };

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user)
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Usuario no encontrado",
        }),
        headers: HEADERS.json,
      };

    await db
      .update(usersTable)
      .set({ emailValidated: true })
      .where(eq(usersTable.email, user.email));

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Usuario confirmado correctamente",
      }),
      headers: HEADERS.json,
    };
  }
}
