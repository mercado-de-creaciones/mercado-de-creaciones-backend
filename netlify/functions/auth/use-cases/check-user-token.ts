
import { db } from "../../../data/db";
import { usersTable } from "../../../data/schemas/user.schema";

import { JwtAdapter } from "../../../config/adapters";
import { HEADERS } from "../../../config/utils";
import { EmailResponse } from "../../../interfaces/response.interface";

import { HandlerResponse } from "@netlify/functions";
import { eq } from "drizzle-orm";

interface CheckUserTokenUseCase {
  execute: (token: string) => Promise<HandlerResponse>;
}

export class CheckUserToken implements CheckUserTokenUseCase {

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
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Token válido",
      }),
      headers: HEADERS.json
    }
  }
}
