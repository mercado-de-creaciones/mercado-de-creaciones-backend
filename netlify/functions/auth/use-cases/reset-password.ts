import { ResetPasswordDto } from "../dtos";

import { HandlerResponse } from "@netlify/functions";

interface ResetPasswordUseCase {
  execute: (dto: ResetPasswordDto) => Promise<HandlerResponse>;
}

export class ResetPassword implements ResetPasswordUseCase {
  public async execute(dto: ResetPasswordDto): Promise<HandlerResponse>{
    return {
      statusCode: 200,
    }
  };
}
