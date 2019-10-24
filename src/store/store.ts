import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
// import {logger} from "redux-logger";
import {createMainReduce} from "./reducers";
import {IAppState} from "./IAppState";

const Middleware =
  process.env.NODE_ENV === "development"
    ? applyMiddleware(thunkMiddleware)
    : applyMiddleware(thunkMiddleware);

const reducers = createMainReduce();

export const createSimpleStore = ( initialState?: IAppState ) => createStore( reducers, initialState, Middleware );
