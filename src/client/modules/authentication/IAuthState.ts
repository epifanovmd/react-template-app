import Cookies from "react-cookies";
import { LoadState } from "../../common/loadState";
import { IUser } from "../../api/dto/Users.g";
import { IReduxData } from "../../store/IAppState";

export interface IAuthState {
  user: IReduxData<IUser | {}>;
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
