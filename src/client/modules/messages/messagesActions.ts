import { actionCreator } from "../../store/common/actionCreator";
import { IEmpty } from "../../common/IEmpty";
import { IMessage } from "./IMessagesState";

export class MessagesActions {
  static getMessages = actionCreator.async<IEmpty, IMessage[], Error>(
    "MESSAGES/GET_MESSAGES",
  );
  static insertMessage = actionCreator.async<IEmpty, IMessage, Error>(
    "MESSAGES/INSERT_MESSAGES",
  );
}
