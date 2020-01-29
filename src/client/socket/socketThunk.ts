import { SimpleThunk } from "../common/simpleThunk";
import { MessagesThunk } from "../modules/messages/messagesThunk";

export const SocketThunk = {
  connect(): SimpleThunk {
    return async (dispatch, {}, { socket }) => {
      socket.on("message", (data: any) => {
        console.log(data);
        const message = JSON.parse(data);

        return dispatch(MessagesThunk.getMessage(message));
      });
    };
  },
};
