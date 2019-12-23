import {IAppState} from "../../store/IAppState";
import {MessagesThunk} from "./messagesThunk";
import {SimpleDispatch} from "../../common/simpleThunk";
import {IMessage} from "./IMessagesState";
import {MessagesActions} from "./messagesActions";

class MessagesSelector {
  mapState = ({messagesPage}: IAppState) => (
    {
      messages: messagesPage.messages,
    }
  );

  mapDispatch = (dispatch: SimpleDispatch) => (
    {
      getMessages: (callback?: (users: IMessage[]) => void) => {
        return dispatch(MessagesThunk.getUsers(callback));
      },
      insertMessage: (message: IMessage) => {
        return dispatch(MessagesActions.insertMessage(message));
      },
    });
}

export const messagesSelector = new MessagesSelector();
