import { db } from "../../../data/db";
import { usersTable } from "../../../data/schemas/user.schema";

import { HEADERS } from "../../../config/utils";
import { BcriptAdapter, JwtAdapter } from "../../../config/adapters";
import { EmailResponse } from "../../../interfaces/response.interface";

import { HandlerResponse } from "@netlify/functions";
import { eq } from "drizzle-orm";
interface ChangePasswordUseCase {
  execute: (token: string, newPassword: string) => Promise<HandlerResponse>;
}

export class ChangePassword implements ChangePasswordUseCase {
  public async execute(token: string, newPassword: string): Promise<HandlerResponse> {
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
    
    const password = BcriptAdapter.hash(newPassword);

    await db
      .update(usersTable)
      .set({ password, })
      .where(eq(usersTable.email, user.email));

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Password modificado correctamente",
      }),
      headers: HEADERS.json,
    };
  }
}
