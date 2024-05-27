import { Message } from "../../interfaces/response.interface";
import { AuthRepository } from "../../repositories/auth.repository";

interface CheckUserTokenUseCase {
  execute: (token: string, newPassword: string) => Promise<Message>;
}

export class CheckUserToken implements CheckUserTokenUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  public execute(token: string): Promise<Message> {
    return this.authRepository.checkToken(token);
  }
}
