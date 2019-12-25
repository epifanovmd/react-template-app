import {combineReducers, Reducer} from "redux";
import {IAppState} from "../IAppState";
import {usersReducer} from "../../modules/users/usersReducer";
import {messagesReducer} from "../../modules/messages/messagesReducer";
import {authReducer} from "../../modules/authentication/AuthReducer";

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
