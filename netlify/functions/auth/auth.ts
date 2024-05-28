import type { HandlerEvent, Handler } from "@netlify/functions";

import { LoginUser, RegisterUser } from "./use-cases";
import { LoginUserDto, RegisterUserDto } from "./dtos";
import { HEADERS, fromBodyToObject } from "../../config/utils";

const handler: Handler = async (event: HandlerEvent) => {
  const { httpMethod, path } = event;
  const body = event.body ? fromBodyToObject(event.body) : {};

  if (httpMethod === "POST" && path.includes("/register")) {
    const [error, registerUserDto] = RegisterUserDto.create(body);
    if (error)
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: error,
        }),
        headers: HEADERS.json,
      };

    return new RegisterUser()
      .execute(registerUserDto!)
      .then((res) => res)
      .catch((error) => error);
  }

  if (httpMethod === "POST" && path.includes("/login")) { 
    const [error, loginUserDto] = LoginUserDto.create(body);
    if (error)
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: error,
        }),
        headers: HEADERS.json,
      };
    
     return new LoginUser()
       .execute(loginUserDto!)
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
  };
};

export { handler };
