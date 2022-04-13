import { LoadState } from "../common";
import { IUsersState } from "../pages/users/IUsersState";

export interface IReduxData<T> {
  loadState: LoadState;
  count?: number;
  page?: number;
  limit?: number;
  data: T;
}

export interface IAppState {
  usersPage: IUsersState;
}
