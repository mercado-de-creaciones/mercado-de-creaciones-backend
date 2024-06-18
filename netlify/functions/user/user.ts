import { Handler, HandlerEvent } from "@netlify/functions";
import { validateJWT } from "../../middlewares/auth.middleware";
import { HEADERS } from "../../config/utils";


const handler: Handler = async (event: HandlerEvent) => {
  const { httpMethod, path } = event;

  const user = await validateJWT(event.headers.authorization!);
  if (user.statusCode !== 200) return user;


  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: HEADERS.json,
    };
  }

   if (httpMethod === "GET" && path.includes("/profile")) {
    return user;
  }
  
  if (httpMethod === "GET" && path.includes("/edit-profile")) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Edit profile",
      }),
      headers: HEADERS.json,
    };
  }


  return {
    statusCode: 405,
    body: JSON.stringify({
      message: "Method Not Allowed",
    }),
    headers: HEADERS.json,
  };
};


export { handler };
