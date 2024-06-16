import { Handler, HandlerEvent } from "@netlify/functions";
import { validateJWT } from "../../middlewares/auth.middleware";
import { HEADERS } from "../../config/utils";


const handler: Handler = async (event: HandlerEvent) => {
  const { httpMethod, path } = event;
  const user = await validateJWT(event.headers.authorization!);

   if (httpMethod === "GET" && path.includes("/profile")) {
    return user;
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
