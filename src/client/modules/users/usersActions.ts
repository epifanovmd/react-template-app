import { actionCreator } from "../../store/common/actionCreator";
import { IEmpty } from "../../common/IEmpty";
import { IUserDto } from "../../api/dto/Users.g";
import { IResponse } from "../../api";

export const UsersActions = {
  getUsers: actionCreator.async<IEmpty, IResponse<IUserDto>, Error>(
    "Users/GET_USERS",
  ),
};
