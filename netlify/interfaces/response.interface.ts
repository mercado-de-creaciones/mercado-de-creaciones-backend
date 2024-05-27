import { SelectUser } from "../data/schemas/user.schema";

export interface EmailResponse {
  email: string;
}

export interface IdResponse {
  id: SelectUser["id"];
}
