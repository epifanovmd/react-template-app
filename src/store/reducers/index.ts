import { combineReducers, Reducer } from "redux";
import { usersSlice } from "Pages/users/reduxToolKit";

import { IAppState } from "../IAppState";

export type Reducers<T> = {
  [P in keyof T]: Reducer<T[P]>;
};

export function createMainReduce(): Reducer<IAppState> {
  const _reducers: Reducers<IAppState> = { usersPage: usersSlice.reducer };

  return combineReducers(_reducers);
}
