import { IUsersState } from "../modules/users/IUsersState";
import { IMessagesState } from "../modules/messages/IMessagesState";
import { IAuthState } from "../modules/authentication/IAuthState";
import { LoadState } from "../common/loadState";

export interface IReduxData<T> {
  loadState?: LoadState;
  count?: number;
  page?: number;
  limit?: number;
  data: T;
}

export interface IAppState {
  usersPage: IUsersState;
  messagesPage: IMessagesState;
  auth: IAuthState;
}
