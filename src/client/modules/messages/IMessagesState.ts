import { LoadState } from "../../common/loadState";
import { IReduxData } from "../../store/IAppState";

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
