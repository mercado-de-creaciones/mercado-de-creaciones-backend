import { db } from "../../../data/db";
import { usersTable } from "../../../data/schemas/user.schema";

import { LoginUserDto } from "../dtos";
import { BcriptAdapter, JwtAdapter } from "../../../config/adapters";
import { HEADERS } from "../../../config/utils";

import { HandlerResponse } from "@netlify/functions";
import { eq } from "drizzle-orm";

interface LoginUserUseCase {
  execute: (dto: LoginUserDto) => Promise<HandlerResponse>;
}

export class LoginUser implements LoginUserUseCase {

  public async execute(dto: LoginUserDto): Promise<HandlerResponse> {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, dto.email));
    
    if (!user) return {
      statusCode: 400,
      body: JSON.stringify({
        message: "El usuario no existe",
      }),
      headers: {
      ...HEADERS.json,
      ...HEADERS.cors,
    },
    }

    if (!user.emailValidated) return {
      statusCode: 403,
      body: JSON.stringify({
        message: "Tu cuenta no ha sido confirmada",
      }),
      headers: {
      ...HEADERS.json,
      ...HEADERS.cors,
    },
    };
    
    const { password, ...newUser } = user;

    const isMatching = BcriptAdapter.compare(dto.password, password);
    if (!isMatching) return {
      statusCode: 400,
      body: JSON.stringify({
        message: "El password es incorrecto",
      }),
      headers: {
      ...HEADERS.json,
      ...HEADERS.cors,
    },
    };

    const token = await JwtAdapter.generateToken({ email: user.email }, "1d");
    if (!token) return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error generando token",
      }),
      headers: {
      ...HEADERS.json,
      ...HEADERS.cors,
    },
    
    };



    return {
      statusCode: 200,
      body: JSON.stringify({
        user: newUser,
        token,
      }),
      headers: {
      ...HEADERS.json,
      ...HEADERS.cors,
    },
    };
      
  }
}
