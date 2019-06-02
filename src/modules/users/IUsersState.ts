import {LoadState} from "../../common/loadState";
import {IUsers} from "../../api/dto/Users.g";

export interface IUsersState {
  users: IUsers[];
  usersLoadState: LoadState;
}

export const usersInitialState: IUsersState = {
  users: [],
  usersLoadState: LoadState.needLoad,
};