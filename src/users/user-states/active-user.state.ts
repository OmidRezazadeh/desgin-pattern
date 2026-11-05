import { User } from "../entities/user.entity.js";
import { UserState } from "./user-state.interface.js";


export class ActiveUserState implements UserState {
  activate(user: User): void {
    throw new Error('User is already active.');
  }

  deactivate(user: User): void {
    user.status = 'INACTIVE';
  }
}