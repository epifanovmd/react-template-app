import { actionCreator } from "Store/common/actionCreator";
import { IEmpty } from "Common/IEmpty";
import { IUserDto } from "Api/dto/Users.g";
import { IResponse } from "@/api";

export const UsersActions = {
  getUsers: actionCreator.async<IEmpty, IResponse<IUserDto>, Error>(
    "Users/GET_USERS",
  ),
};
