import { actionCreator } from "../../store/common/actionCreator";
import { Login, Registration } from "../../api/dto/Auth.g";
import { IUser } from "../../api/dto/Users.g";

export const AuthActions = {
  auth: actionCreator.async<Login, IUser, Error>("Auth/AUTHORIZATION"),
  registration: actionCreator.async<Registration, IUser, Error>(
    "Auth/REGISTRATION",
  ),
  logOut: actionCreator("Auth/LOG_OUT"),
};
