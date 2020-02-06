import { IUsersState } from "Modules/users/IUsersState";
import { IMessagesState } from "Modules/messages/IMessagesState";
import { IAuthState } from "Modules/authentication/IAuthState";
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
  messagesPage: IMessagesState;
  auth: IAuthState;
}
