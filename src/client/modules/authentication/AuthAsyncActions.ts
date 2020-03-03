import { SimpleThunk } from "Common/simpleThunk";
import { popup } from "Common/popup";
import { Login, Registration } from "Api/dto/Auth.g";
import { AuthActions } from "./AuthActions";
import { IUserDto } from "Api/dto/Users.g";
import { callApi } from "Store/common/apiActionsAsync";
import { RequestType } from "Common/requestType";

export const AuthAsyncActions = {
  auth(params: Login, callback?: (user: IUserDto) => void): SimpleThunk {
    return callApi({
      url: "auth/login",
      method: RequestType.POST,
      params,
      actions: AuthActions.auth,
      onSuccess: ({}, result, { socket }) => {
        socket.open();
        callback && callback(result.data);
      },
      onFail: ({}, {}, { i18next }) => {
        popup.notification.error({
          message: i18next.t("error"),
          description: i18next.t("auth_error"),
        });
      },
    });
  },

  registration(
    params: Registration,
    callback?: (token: IUserDto) => void,
  ): SimpleThunk {
    return callApi({
      url: "auth/registration",
      method: RequestType.POST,
      params,
      actions: AuthActions.registration,
      onSuccess: ({}, result, { socket }) => {
        socket.open();
        callback && callback(result.data);
      },
      onFail: (error, {}, { i18next }) => {
        popup.notification.error({
          message: i18next.t("error"),
          description: i18next.t(error.name),
        });
      },
    });
  },
};
