import {actionCreator} from "../../store/common/actionCreator";
import {Login, Registration} from "../../api/dto/Auth.g";
import {IUser} from "../../api/dto/Users.g";

export class AuthActions {
  static auth = actionCreator.async<Login, IUser, Error>("Auth/AUTHORIZATION");
  static registration = actionCreator.async<Registration, IUser, Error>("Auth/REGISTRATION");
  static logOut = actionCreator("Auth/LOG_OUT");
}
