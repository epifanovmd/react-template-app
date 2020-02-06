import { LoadState } from "Common/loadState";
import { IReduxData } from "Store/IAppState";

export interface IMessage {
  recipientId: string;
  name: string;
  message: string;
}

export interface IMessagesState {
  messages: IReduxData<IMessage[]>;
}

export const messagesInitialState: IMessagesState = {
  messages: {
    data: [],
    loadState: LoadState.needLoad,
    count: 0,
  },
};
