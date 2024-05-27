import type { HandlerEvent, Handler } from "@netlify/functions";
import { HEADERS } from "../../config/utils/constants";
import { RegisterUserDto } from "./dtos";
import { fromBodyToObject } from "../../config/utils";
import { RegisterUser } from "./use-cases/register-user";



const handler: Handler = async (event: HandlerEvent) => {
  const { httpMethod, path } = event;
  const body = event.body ? fromBodyToObject(event.body) : {};

  if (httpMethod === "POST" && path.includes("/register")) {
    const [error, registerUserDto] = RegisterUserDto.create(body);
    if (error) return {
      statusCode: 400,
      body: JSON.stringify({
        message: error,
      }),
      headers: HEADERS.json,
    }

    return new RegisterUser()
      .execute(registerUserDto!)
      .then((res) => res)
      .catch((error) => error);

  }

  if (httpMethod === "GET") {

  }


  return {
    statusCode: 405,
    body: JSON.stringify({
      message: "Method Not Allowed",
    }),
    headers: HEADERS.json,
  }
}

export { handler };
