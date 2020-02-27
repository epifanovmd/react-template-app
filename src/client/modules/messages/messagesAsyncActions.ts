import { MessagesActions } from "./messagesActions";
import { popup } from "Common/popup";
import { SimpleThunk } from "Common/simpleThunk";
import { IMessage } from "./IMessagesState";

export const MessagesAsyncActions = {
  getMessages: (callback?: (messages: IMessage[]) => void): SimpleThunk => {
    return async (dispatch, {}, { i18next }) => {
      const params = {};
      dispatch(MessagesActions.getMessages.started(params));
      try {
        // const data = await requestRepository.usersApiRequest.get();
        const result: IMessage[] = [
          {
            message: "",
            name: "",
            recipientId: "",
          },
        ];
        callback && callback(result);
        dispatch(MessagesActions.getMessages.done({ params, result }));
      } catch (error) {
        popup.notification.error({
          message: i18next.t("error"),
          description: i18next.t(error.error?.type),
        });
        dispatch(MessagesActions.getMessages.failed({ params, error }));
      }
    };
  },

  getMessage: (
    message: IMessage,
    callback?: (messages: IMessage) => void,
  ): SimpleThunk => {
    return async (dispatch, {}, { i18next }) => {
      const params = {};
      dispatch(MessagesActions.insertMessage.started(params));
      try {
        // const data = await requestRepository.usersApiRequest.get();
        dispatch(
          MessagesActions.insertMessage.done({ params, result: message }),
        );
        callback && callback(message);
      } catch (error) {
        popup.notification.error({
          message: i18next.t("error"),
          description: i18next.t(error.error?.type),
        });
        dispatch(MessagesActions.insertMessage.failed({ params, error }));
      }
    };
  },

  sendMessage: (
    message: IMessage,
    callback?: (messages: IMessage) => void,
  ): SimpleThunk => {
    return async (dispatch, {}, { i18next, socket }) => {
      const params = {};
      dispatch(MessagesActions.insertMessage.started(params));
      try {
        // const data = await requestRepository.usersApiRequest.get();
        socket.emit("message", JSON.stringify(message));
        dispatch(
          MessagesActions.insertMessage.done({ params, result: message }),
        );
        callback && callback(message);
      } catch (error) {
        popup.notification.error({
          message: i18next.t("error"),
          description: i18next.t(error.error?.type),
        });
        dispatch(MessagesActions.insertMessage.failed({ params, error }));
      }
    };
  },
};
