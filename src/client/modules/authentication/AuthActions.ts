import { actionCreator } from "../../store/common/actionCreator";
import { Login, Registration } from "../../api/dto/Auth.g";
import { IUser } from "../../api/dto/Users.g";
import { IResponse } from "../../api";

export const AuthActions = {
  auth: actionCreator.async<Login, IResponse<IUser>, Error>(
    "Auth/AUTHORIZATION",
  ),
  registration: actionCreator.async<Registration, IResponse<IUser>, Error>(
    "Auth/REGISTRATION",
  ),
  logOut: actionCreator("Auth/LOG_OUT"),
};
