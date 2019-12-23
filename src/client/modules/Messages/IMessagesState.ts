import {LoadState} from "../../common/loadState";
import {IUser} from "../../api/dto/Users.g";
import {IResponse} from "../../common/response";

export interface IMessage {
  recipientId: string;
  name: string;
  message: string;
}

export interface IMessagesState {
  messages: IResponse<IMessage[]>;
}

export const messagesInitialState: IMessagesState = {
  messages: {
    items: [],
    loadState: LoadState.needLoad,
  },
};
