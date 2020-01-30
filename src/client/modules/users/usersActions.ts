import { actionCreator } from "../../store/common/actionCreator";
import { IEmpty } from "../../common/IEmpty";
import { IUser } from "../../api/dto/Users.g";
import { IResponse } from "../../api";

export const UsersActions = {
  getUsers: actionCreator.async<IEmpty, IResponse<IUser[]>, Error>(
    "Users/GET_USERS",
  ),
};
