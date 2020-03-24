import { IUsersState } from "Modules/users/IUsersState";
import { LoadState } from "Common/loadState";

export interface IReduxData<T> {
  loadState?: LoadState;
  count?: number;
  page?: number;
  limit?: number;
  data: T;
}

export interface IAppState {
  usersPage: IUsersState;
}
