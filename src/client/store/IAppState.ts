import {IUsersState} from "../modules/users/IUsersState";
import {IMessagesState} from "../modules/Messages/IMessagesState";

export interface IAppState {
  usersPage: IUsersState;
  messagesPage: IMessagesState;
}
