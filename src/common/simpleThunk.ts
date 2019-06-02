import {ThunkAction} from "redux-thunk";
import {Action} from "redux";
import {IAppState} from "../store/IAppState";

export type SimpleThunk = ThunkAction<void, IAppState, Error, Action>;