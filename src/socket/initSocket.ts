import { connect } from "socket.io-client";

const SOCKET_URL = "http://localhost:3132";

export const initSocket = () => {
  const socket = connect(SOCKET_URL);

  socket.on("connect", () => {
    console.log("connected");
  });
  socket.on("error", (error: any) => {
    console.log("SocketError: ", error);
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
  });

  return socket;
};
