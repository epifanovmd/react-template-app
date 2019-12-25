import {MessagesActions} from "./messagesActions";
import {popup} from "../../common/popup";
import {SimpleThunk} from "../../common/simpleThunk";
import {IMessage} from "./IMessagesState";

export class MessagesThunk {
  static getUsers(callback?: (messages: IMessage[]) => void): SimpleThunk {
    return async (dispatch, {}, {i18next}) => {
      const params = {};
      dispatch(MessagesActions.getMessages.started(params));
      try {
        // const data = await requestRepository.usersApiRequest.get();
        const result: IMessage[] = [{
          message: "",
          name: "",
          recipientId: "",
        }];
        callback && callback(result);
        dispatch(MessagesActions.getMessages.done({params, result}));
      } catch (error) {
        popup.error(i18next.t("error"), i18next.t(error.error.type));
        dispatch(MessagesActions.getMessages.failed({params, error}));
      }
    };
  }
}
