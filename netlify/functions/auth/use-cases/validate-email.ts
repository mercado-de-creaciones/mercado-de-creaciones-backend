import { AuthRepository } from "../../repositories/auth.repository";
import { Message } from "../../interfaces/response.interface";

interface ValidateEmailUseCase {
  execute(token: string): Promise<Message>;
}

export class ValidateEmail implements ValidateEmailUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  public execute(token: string): Promise<Message> {
    return this.authRepository.validateEmail(token);
  }
}
