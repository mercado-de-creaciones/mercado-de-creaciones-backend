import { UserEntity } from "../../entities/user.entity";

interface GetProfileUseCase {
  execute(user: UserEntity): UserEntity;
}

export class GetProfile implements GetProfileUseCase {
  public execute = (user: UserEntity): UserEntity => {

    return user;
  };
}