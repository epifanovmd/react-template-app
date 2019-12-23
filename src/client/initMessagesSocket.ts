import Socket from "socket.io-client";
import {MessagesActions} from "./modules/Messages/messagesActions";
import {IAppState} from "./store/IAppState";
import {Store} from "redux";

const SOCKET_URL = "http://localhost:3131";
export const initMessagesSocket = (store: Store<IAppState>) => {
  const socket = Socket.connect(SOCKET_URL);

  socket.on("connect", () => {
    console.log("connected");
  });

  socket.on("message", (evt: any) => {
    console.log(evt);
    const message = JSON.parse(evt);
    store.dispatch(MessagesActions.insertMessage(message));
  });

  socket.on("error", (error: any) => {
    console.log("SocketError: ", error);
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });

  return socket;
};
