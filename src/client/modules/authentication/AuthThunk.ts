import { SimpleThunk } from "../../common/simpleThunk";
import { popup } from "../../common/popup";
import { Login, Registration } from "../../api/dto/Auth.g";
import { AuthActions } from "./AuthActions";
import { IUser } from "../../api/dto/Users.g";
import { callApi } from "../../store/common/apiActionsAsync";
import { RequestType } from "../../common/requestType";

export class AuthThunk {
  static auth(params: Login, callback?: (user?: IUser) => void): SimpleThunk {
    return callApi({
      url: "auth/login",
      method: RequestType.POST,
      params,
      actions: AuthActions.auth,
      onSuccess: ({}, result, { socket }) => {
        socket.open();
        callback && callback(result);
      },
      onFail: ({}, {}, { i18next }) => {
        popup.error(i18next.t("error"), i18next.t("auth_error"));
      },
    });
  }

  static registration(
    params: Registration,
    callback?: (token: IUser) => void,
  ): SimpleThunk {
    return callApi({
      url: "auth/registration",
      method: RequestType.POST,
      params,
      actions: AuthActions.registration,
      onSuccess: ({}, result, { socket }) => {
        socket.open();
        callback && callback(result);
      },
      onFail: (error, {}, { i18next }) => {
        popup.error(i18next.t("error"), i18next.t(error.name));
      },
    });
  }
}
