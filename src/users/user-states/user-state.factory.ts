import { ActiveUserState } from "./active-user.state.js";
import { InactiveUserState } from "./inactive-user.state.js";
import { UserState } from "./user-state.interface.js";


const USER_STATES: Record<'ACTIVE' | 'INACTIVE', UserState> = {
  ACTIVE: new ActiveUserState(),
  INACTIVE: new InactiveUserState(),
};

export function getUserState(status: 'ACTIVE' | 'INACTIVE'): UserState {
  return USER_STATES[status];
}