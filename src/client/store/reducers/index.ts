import { combineReducers, Reducer } from "redux";
import { IAppState } from "../IAppState";
import { usersReducer } from "Modules/users/usersReducer";
import { messagesReducer } from "Modules/messages/messagesReducer";
import { authReducer } from "Modules/authentication/AuthReducer";

export type Reducers<T> = {
  [P in keyof T]: Reducer<T[P]>;
};

export function createMainReduce(): Reducer<IAppState> {
  const _reducers: Reducers<IAppState> = {
    usersPage: usersReducer,
    messagesPage: messagesReducer,
    auth: authReducer,
  };

  return combineReducers(_reducers);
}
