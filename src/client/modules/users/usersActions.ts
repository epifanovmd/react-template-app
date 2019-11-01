import {actionCreator} from "../../store/common/actionCreator";
import {IEmpty} from "../../common/IEmpty";
import {IUser} from "../../api/dto/Users.g";

export class UsersActions {
  static getUsers = actionCreator.async<IEmpty, IUser[], Error>("Users/GET_USERS");
}
