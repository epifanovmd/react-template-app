import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { IAppState } from "Store/IAppState";
import { IExtraArguments } from "Store/store";

export type SimpleThunk = ThunkAction<
  Promise<void>,
  IAppState,
  IExtraArguments,
  Action
>;
export type SimpleDispatch = ThunkDispatch<IAppState, IExtraArguments, Action>;
