import { configureStore } from "@reduxjs/toolkit";
import { History } from "history";
import i18next from "i18next";
import { Store } from "redux";
import thunkMiddleware from "redux-thunk";

import { initSocket } from "@/socket/initSocket";

import { IAppState } from "./IAppState";
import { createMainReduce } from "./reducers";

export const socket: SocketIOClient.Socket = initSocket();
export interface IExtraArguments {
  i18next: typeof i18next;
  socket: SocketIOClient.Socket;
  history?: History;
}

const rootReducer = createMainReduce();

export const createSimpleStore = (
  history?: History,
  preloadedState?: IAppState,
) => {
  const store: Store<IAppState, any> = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: [
      thunkMiddleware.withExtraArgument<IExtraArguments>({
        i18next,
        socket,
        history,
      }),
    ],
    devTools: process.env.NODE_ENV === "development",
  });

  return store;
};
