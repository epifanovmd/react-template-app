import { UsersActions } from "./usersActions";
import { requestRepository } from "../../api/RequestsRepository.g";
import { popup } from "../../common/popup";
import { IUser } from "../../api/dto/Users.g";
import { SimpleThunk } from "../../common/simpleThunk";

export class UsersThunk {
  static getUsers(callback?: (users: IUser[]) => void): SimpleThunk {
    return async (dispatch, {}, { i18next }) => {
      const params = {};
      dispatch(UsersActions.getUsers.started(params));
      try {
        const result = await requestRepository.usersApiRequest.get();
        callback && callback(result.data);
        dispatch(UsersActions.getUsers.done({ params, result }));
      } catch (error) {
        popup.error(i18next.t("error"), i18next.t(error.error?.type));
        console.log("error", error);
        dispatch(UsersActions.getUsers.failed({ params, error }));
      }
    };
  }
}
