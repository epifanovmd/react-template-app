import { actionCreator } from "Store/common/actionCreator";
import { IEmpty } from "Common/IEmpty";
import { IResponse } from "@/api";
import { IUser } from "Api/dto/Users.g";

export const UsersActions = {
  getUsers: actionCreator.async<IEmpty, IResponse<IUser[]>, Error>(
    "Users/GET_USERS",
  ),
};
