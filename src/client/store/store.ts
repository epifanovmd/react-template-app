import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {createMainReduce} from "./reducers";
import {IAppState} from "./IAppState";
import { composeWithDevTools } from "redux-devtools-extension";

const Middleware = applyMiddleware(thunkMiddleware);

const reducers = createMainReduce();

export const createSimpleStore = ( initialState?: IAppState ) =>
  createStore( reducers, initialState, composeWithDevTools(Middleware) );
