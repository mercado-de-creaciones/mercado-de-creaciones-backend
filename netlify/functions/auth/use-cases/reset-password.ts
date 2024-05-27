import { Message } from "../../interfaces/response.interface";
import { AuthRepository } from "../../repositories/auth.repository";
import { ResetPasswordDto } from "../../dtos/auth/reset-password.dto";

interface ResetPasswordUseCase {
  execute: (dto: ResetPasswordDto) => Promise<Message>;
}

export class ResetPassword implements ResetPasswordUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  public execute = (dto: ResetPasswordDto) => {
    return this.authRepository.resetPassword(dto);
  };
}
