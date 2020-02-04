import { actionCreator } from "../../store/common/actionCreator";
import { Login, Registration } from "../../api/dto/Auth.g";
import { IUserDto } from "../../api/dto/Users.g";
import { IResponse } from "../../api";

export const AuthActions = {
  auth: actionCreator.async<Login, IResponse<IUserDto>, Error>(
    "Auth/AUTHORIZATION",
  ),
  registration: actionCreator.async<Registration, IResponse<IUserDto>, Error>(
    "Auth/REGISTRATION",
  ),
  logOut: actionCreator("Auth/LOG_OUT"),
};
