import { User } from "../entities/user.entity.js";

export interface UserState {
  activate(user:User): void;
  deactivate(user:User): void;
}