import { UsersActions } from "./usersActions";
import { popup } from "../../common/popup";
import { IUser } from "../../api/dto/Users.g";
import { SimpleThunk } from "../../common/simpleThunk";
import { callApi } from "../../store/common/apiActionsAsync";
import { RequestType } from "../../common/requestType";

export const UsersThunk = {
  getUsers: (callback?: (users: IUser[]) => void): SimpleThunk => {
    return callApi({
      url: "users",
      method: RequestType.GET,
      params: {},
      actions: UsersActions.getUsers,
      onSuccess: ({}, result) => {
        callback && callback(result.data);
      },
      onFail: ({}, {}, { i18next }) => {
        popup.error(i18next.t("error"), i18next.t("auth_error"));
      },
    });
  },
};
