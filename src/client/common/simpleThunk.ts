import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {IAppState} from "../store/IAppState";
import i18next from "i18next";

export type SimpleThunk = ThunkAction<Promise<void>, IAppState, { i18next: typeof i18next }, Action>;
export type SimpleDispatch = ThunkDispatch<IAppState, { i18next: typeof i18next }, Action>;
