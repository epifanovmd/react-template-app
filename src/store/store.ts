import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
// import {logger} from "redux-logger";
import {createMainReduce} from "./reducers";

const Middleware =
  process.env.NODE_ENV === "development"
    ? applyMiddleware(thunkMiddleware)
    : applyMiddleware(thunkMiddleware);

const reducers = createMainReduce();
export const store = createStore(
  reducers,
  Middleware,
);
