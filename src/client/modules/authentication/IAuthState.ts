import Cookies from "react-cookies";
import {IResponse} from "../../common/response";
import {LoadState} from "../../common/loadState";
import {IUser} from "../../api/dto/Users.g";

export interface IAuthState {
  user: IResponse<IUser | {}>;
  token: string;
}

export const authInitialState: IAuthState = {
  token: Cookies.load("token"),
  user: {
    loadState: LoadState.needLoad,
    count: 0,
    data: {},
  },
};
