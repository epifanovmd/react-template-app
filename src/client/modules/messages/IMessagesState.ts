import {LoadState} from "../../common/loadState";
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
    data: [],
    loadState: LoadState.needLoad,
    count: 0,
  },
};
