import { AuthActions } from "./AuthActions";
import { Success } from "typescript-fsa";
import { newState } from "Store/common/newState";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { authInitialState, IAuthState } from "./IAuthState";
import { LoadState } from "Common/loadState";
import { Login } from "Api/dto/Auth.g";
import { IUserDto } from "Api/dto/Users.g";
import Cookies from "react-cookies";
import { IResponse } from "@/api";

function AuthStartedHandler(state: IAuthState): IAuthState {
  return newState(state, {
    token: "",
    user: {
      ...state.user,
      loadState: LoadState.refreshing,
    },
  });
}

function AuthDoneHandler(
  state: IAuthState,
  { result }: Success<Login, IResponse<IUserDto>>,
): IAuthState {
  return newState(state, {
    token: Cookies.load("token"),
    user: {
      data: result.data,
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
