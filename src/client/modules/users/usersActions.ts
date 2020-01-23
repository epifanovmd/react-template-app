import { actionCreator } from "../../store/common/actionCreator";
import { IEmpty } from "../../common/IEmpty";
import { IUser } from "../../api/dto/Users.g";
import { IResponse } from "../../common/response";

export class UsersActions {
  static getUsers = actionCreator.async<IEmpty, IResponse<IUser[]>, Error>(
    "Users/GET_USERS",
  );
}
