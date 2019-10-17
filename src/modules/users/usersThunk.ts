import {UsersActions} from "./usersActions";
import {requestRepository} from "../../api/RequestsRepository.g";
import {popup} from "../../common/popup";
import {IUsers} from "../../api/dto/Users.g";
import {SimpleThunk} from "../../common/simpleThunk";

export class UsersThunk {
  static getUsers(callback?: (users: IUsers[]) => void): SimpleThunk {
    return async (dispatch) => {
      const params = {};
      dispatch(UsersActions.getUsers.started(params));
      try {
        const result = await requestRepository.usersApiRequest.get();
        callback && callback(result);
        dispatch(UsersActions.getUsers.done({params, result}));
      } catch (error) {
        popup.error(error.type);
        dispatch(UsersActions.getUsers.failed({params, error}));
      }
    };
  }
}
