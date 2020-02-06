import { UsersActions } from "./usersActions";
import { popup } from "Common/popup";
import { IUser } from "Api/dto/Users.g";
import { SimpleThunk } from "Common/simpleThunk";
import { RequestType } from "Common/requestType";
import { callApi } from "Store/common/apiActionsAsync";

export const UsersAsyncActions = {
  getUsers: (callback?: (users: IUser[]) => void): SimpleThunk => {
    return callApi({
      url: "users",
      method: RequestType.GET,
      params: {},
      actions: UsersActions.getUsers,
      onSuccess: ({}, result) => {
        callback && callback(result.data.data);
      },
      onFail: ({}, {}, { i18next }) => {
        popup.error(i18next.t("error"), i18next.t("auth_error"));
      },
    });
  },
};
