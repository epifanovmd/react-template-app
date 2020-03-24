import { actionCreator } from "../../store/common/actionCreator";
import { IEmpty } from "Common/IEmpty";
import { IResponse } from "../../api";
import { IUser } from "src/api/dto/Users.g";

export const UsersActions = {
  getUsers: actionCreator.async<IEmpty, IResponse<IUser[]>, Error>(
    "Users/GET_USERS",
  ),
};
