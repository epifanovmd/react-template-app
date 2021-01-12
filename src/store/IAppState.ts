import { LoadState } from "Common/loadState";
import { IUsersState } from "Pages/users/IUsersState";

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
