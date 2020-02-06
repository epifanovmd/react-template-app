import Cookies from "react-cookies";
import { LoadState } from "Common/loadState";
import { IUserDto } from "Api/dto/Users.g";
import { IReduxData } from "Store/IAppState";

export interface IAuthState {
  user: IReduxData<IUserDto | {}>;
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
