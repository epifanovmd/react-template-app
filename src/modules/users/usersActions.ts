import { IEmpty } from "Common/IEmpty";
import { IUser } from "src/api/dto/Users.g";

import { IResponse } from "../../api";
import { actionCreator } from "../../store/common/actionCreator";

export const UsersActions = {
  getUsers: actionCreator.async<IEmpty, IResponse<IUser[]>, Error>(
    "Users/GET_USERS",
  ),
};
