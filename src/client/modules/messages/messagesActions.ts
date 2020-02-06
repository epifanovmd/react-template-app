import { actionCreator } from "Store/common/actionCreator";
import { IEmpty } from "Common/IEmpty";
import { IMessage } from "./IMessagesState";

export const MessagesActions = {
  getMessages: actionCreator.async<IEmpty, IMessage[], Error>(
    "MESSAGES/GET_MESSAGES",
  ),
  insertMessage: actionCreator.async<IEmpty, IMessage, Error>(
    "MESSAGES/INSERT_MESSAGES",
  ),
};
