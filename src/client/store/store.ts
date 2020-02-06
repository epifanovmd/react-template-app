import { applyMiddleware, createStore, Store } from "redux";
import thunkMiddleware from "redux-thunk";
import { createMainReduce } from "./reducers";
import { IAppState } from "./IAppState";
import { composeWithDevTools } from "redux-devtools-extension";
import i18next from "i18next";
import { initSocket } from "@/socket/initSocket";
import { SocketAsyncActions } from "@/socket/socketAsyncActions";

export const socket: SocketIOClient.Socket = initSocket();
export interface IExtraArguments {
  i18next: typeof i18next;
  socket: SocketIOClient.Socket;
}

const middleware =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(
        applyMiddleware(
          thunkMiddleware.withExtraArgument<IExtraArguments>({
            i18next,
            socket,
          }),
        ),
      )
    : applyMiddleware(
        thunkMiddleware.withExtraArgument<IExtraArguments>({ i18next, socket }),
      );

const reducers = createMainReduce();

export const createSimpleStore = (initialState?: IAppState) => {
  const store: Store<IAppState, any> = createStore(
    reducers,
    initialState,
    middleware,
  );
  store.dispatch(SocketAsyncActions.connect());

  return store;
};
