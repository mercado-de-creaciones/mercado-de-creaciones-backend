import { Handler, HandlerEvent } from "@netlify/functions";
import { HEADERS } from "../../config/utils";

const handler: Handler = async (event: HandlerEvent) => { 
  console.log(JSON.stringify(event,null,2));
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hola desde funcion producto",
    }),
    headers: HEADERS.json
  }
}

export { handler };