import {actionCreator} from "../../store/common/actionCreator";
import {IEmpty} from "../../common/IEmpty";
import {IUsers} from "../../api/dto/Users.g";

export class UsersActions {
  static getUsers = actionCreator.async<IEmpty, IUsers[], Error>("Users/GET_USERS");
}
