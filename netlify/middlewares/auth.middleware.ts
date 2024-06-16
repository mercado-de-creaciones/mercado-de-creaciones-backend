import { db } from "../data/db";
import { usersTable } from "../data/schemas/user.schema";

import { JwtAdapter } from "../config/adapters";
import { HEADERS } from "../config/utils";
import { EmailResponse } from "../interfaces/response.interface";

import { eq } from "drizzle-orm";

export const validateJWT = async (authorization: string) => {
  if (!authorization) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "No token provided" }),
      headers: HEADERS.json,
    };
  }

  if (!authorization.startsWith("Bearer ")) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Invalid Bearer token" }),
      headers: HEADERS.json,
    };
  }

  const token = authorization.split(" ").at(1) || "";

  try {
    const payload = await JwtAdapter.validateToken<EmailResponse>(token);
    if (!payload) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Invalid token" }),
        headers: HEADERS.json,
      };
    }

    const response = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        emailValidated: usersTable.emailValidated,
        role: usersTable.role,
        img: usersTable.img,
      })
      .from(usersTable)
      .where(eq(usersTable.email, payload.email));
    
    const user = response?.at(0);
    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Invalid token - User not found" }),
        headers: HEADERS.json,
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(user),
      headers: HEADERS.json,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
      headers: HEADERS.json,
    };
  }
};
