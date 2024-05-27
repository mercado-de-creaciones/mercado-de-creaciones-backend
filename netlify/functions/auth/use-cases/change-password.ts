import { HandlerResponse } from "@netlify/functions";

interface ChangePasswordUseCase {
  execute: (token: string, newPassword: string) => Promise<HandlerResponse>;
}

export class ChangePassword implements ChangePasswordUseCase {
  public async execute(token: string, newPassword: string): Promise<HandlerResponse> {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Password changed successfully",
      }),
    }
  }
}
