import { IUsersState } from "../modules/users/IUsersState";
import { IMessagesState } from "../modules/messages/IMessagesState";
import { IAuthState } from "../modules/authentication/IAuthState";

export interface IAppState {
  usersPage: IUsersState;
  messagesPage: IMessagesState;
  auth: IAuthState;
}
