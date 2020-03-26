import { popup } from "Common/popup";
import { RequestType } from "Common/requestType";
import { SimpleThunk } from "Common/simpleThunk";
import { IUser } from "src/api/dto/Users.g";
import { callApi } from "Store/common/apiActionsAsync";

import { UsersActions } from "./usersActions";

export const UsersAsyncActions = {
  getUsers: (callback?: (users: IUser[]) => void): SimpleThunk =>
    callApi({
      url: "users",
      method: RequestType.GET,
      params: {},
      actions: UsersActions.getUsers,
      onSuccess: ({}, result) => {
        callback && callback(result.data);
      },
      onFail: ({}, {}, { i18next }) => {
        popup.notification.error({
          message: i18next.t("error"),
          description: i18next.t("error"),
        });
      },
    }),
};
