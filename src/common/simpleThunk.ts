import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {IAppState} from "../store/IAppState";

export type SimpleThunk = ThunkAction<Promise<void>, IAppState, Error, Action>;
export type SimpleDispatch = ThunkDispatch<IAppState, Error, Action>;
