import { User } from "../entities/user.entity.js";
import { UserState } from "./user-state.interface.js";


export class InactiveUserState implements UserState {
  activate(user: User): void {
    user.status = 'ACTIVE';
  }

  deactivate(user: User): void {
    throw new Error('User is already inactive.');
  }
}