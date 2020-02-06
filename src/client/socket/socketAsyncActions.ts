import { SimpleThunk } from "Common/simpleThunk";
import { MessagesAsyncActions } from "Modules/messages/messagesAsyncActions";

export const SocketAsyncActions = {
  connect(): SimpleThunk {
    return async (dispatch, {}, { socket }) => {
      socket.on("message", (data: any) => {
        console.log(data);
        const message = JSON.parse(data);

        return dispatch(MessagesAsyncActions.getMessage(message));
      });
    };
  },
};
