import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { users } from "../../data/schemas/user.schema";
import { envs } from "../../config/envs";

import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;


const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const { httpMethod } = event;

  if (httpMethod === "GET") {
    console.log({ event, context });

    const pool = new Pool({ connectionString: envs.DATABASE_URL });
    const db = drizzle(pool);

    const user = await db.insert(users).values({
      name: "Moises Prado",
      email: "moi.prado20@gmail.com",
      password: "12345678",
    })

    await pool.end();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Usuario Insertado correctamente",
        user,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }  
  
  if (httpMethod === "POST") {
    // Code for POST method
  }  
  
  if (httpMethod === "PUT") {
    // Code for PUT method
  }  
  
  if (httpMethod === "DELETE") {
    // Code for DELETE method
  }  
  
  return {
    statusCode: 405,
    body: "Method Not Allowed",
  };
};

export { handler };
