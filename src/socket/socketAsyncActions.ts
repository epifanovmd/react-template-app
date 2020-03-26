import { SimpleThunk } from "Common/simpleThunk";

export const SocketAsyncActions = {
  connect(): SimpleThunk {
    // eslint-disable-next-line require-await
    return async ({}, {}, { socket }) => {
      socket.on("message", (data: any) => {
        console.log(JSON.parse(data));

        // return dispatch();
      });
    };
  },
};
