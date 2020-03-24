import { SimpleThunk } from "Common/simpleThunk";

export const SocketAsyncActions = {
  connect(): SimpleThunk {
    return async ({}, {}, { socket }) => {
      socket.on("message", (data: any) => {
        console.log(JSON.parse(data));

        // return dispatch();
      });
    };
  },
};
