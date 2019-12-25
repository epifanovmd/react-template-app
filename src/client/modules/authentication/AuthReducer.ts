import {AuthActions} from "./AuthActions";
import {Success} from "typescript-fsa";
import {newState} from "../../store/common/newState";
import {reducerWithInitialState} from "typescript-fsa-reducers";
import {authInitialState, IAuthState} from "./IAuthState";
import {LoadState} from "../../common/loadState";
import {Login} from "../../api/dto/Auth.g";
import {IUser} from "../../api/dto/Users.g";
import Cookies from "react-cookies";

function AuthStartedHandler(state: IAuthState): IAuthState {
  return newState(state, {
    token: "",
    user: {
      ...state.user,
      loadState: LoadState.refreshing,
    },
  });
}

function AuthDoneHandler(state: IAuthState, success: Success<Login, IUser>): IAuthState {
  return newState(state, {
    token: Cookies.load("token"),
    user: {
      data: success.result,
      loadState: LoadState.refreshing,
    },
  });
}

function AuthFailedHandler(state: IAuthState): IAuthState {
  return newState(state, {
    token: "",
    user: {
      ...state.user,
      loadState: LoadState.error,
    },
  });
}

function LogOutHandler(state: IAuthState) {
  Cookies.remove("token");

  return newState(state, {
    token: "",
    user: {
      data: {},
      loadState: LoadState.needLoad,
    },
  });
}

export const authReducer = reducerWithInitialState(authInitialState)
  .case(AuthActions.auth.started, AuthStartedHandler)
  .case(AuthActions.auth.done, AuthDoneHandler)
  .case(AuthActions.auth.failed, AuthFailedHandler)

  .case(AuthActions.logOut, LogOutHandler)
  .build();
