import { db } from "../data/db";
import { usersTable } from "../data/schemas/user.schema";
import { JwtAdapter } from "../config/adapters";
import { HEADERS } from "../config/utils";
import { IdResponse } from "../interfaces/response.interface";
import { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";
import { eq } from "drizzle-orm";

export const validateJWT = (handler: Handler) => {
  return async (event: HandlerEvent, context: HandlerContext) => {
    const authorization =
      event.headers.Authorization || event.headers.authorization;
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
      const payload = await JwtAdapter.validateToken<IdResponse>(token);
      if (!payload) {
        return {
          statusCode: 401,
          body: JSON.stringify({ message: "Invalid token" }),
          headers: HEADERS.json,
        };
      }

      const user = (
        await db.select().from(usersTable).where(eq(usersTable.id, payload.id))
      ).at(0);
      if (!user) {
        return {
          statusCode: 401,
          body: JSON.stringify({ message: "Invalid token - User not found" }),
          headers: HEADERS.json,
        };
      }

      event.user = user;
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Internal server error" }),
        headers: HEADERS.json,
      };
    }
  };
};
