import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { UserResponse } from "../../interfaces/user.interface";
import { AuthRepository } from "../../repositories/auth.repository";

interface LoginUserUseCase {
  execute: (dto: LoginUserDto) => Promise<UserResponse>;
}

export class LoginUser implements LoginUserUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  public async execute(dto: LoginUserDto): Promise<UserResponse> {
    return this.authRepository.login(dto);
  }
}
