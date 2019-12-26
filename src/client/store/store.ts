import {applyMiddleware, createStore, Store} from "redux";
import thunkMiddleware from "redux-thunk";
import {createMainReduce} from "./reducers";
import {IAppState} from "./IAppState";
import {composeWithDevTools} from "redux-devtools-extension";
import i18next from "i18next";
import {initSocket} from "../socket/initSocket";
import {SocketThunk} from "../socket/socketThunk";

export const socket: SocketIOClient.Socket = initSocket();

const middleware = process.env.NODE_ENV === "development" ?
  composeWithDevTools(applyMiddleware(thunkMiddleware.withExtraArgument({i18next, socket}))) :
  applyMiddleware(thunkMiddleware.withExtraArgument({i18next, socket}));

const reducers = createMainReduce();

export const createSimpleStore = (initialState?: IAppState) => {
  const store: Store<IAppState, any> = createStore(reducers, initialState, middleware);
  store.dispatch(SocketThunk.connect());

  return store;
};
