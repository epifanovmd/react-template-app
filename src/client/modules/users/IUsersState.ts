import { LoadState } from "../../common/loadState";
import { IUser } from "../../api/dto/Users.g";
import { IReduxData } from "../../store/IAppState";

export interface IUsersState {
  users: IReduxData<IUser[]>;
}

export const usersInitialState: IUsersState = {
  users: {
    data: [],
    loadState: LoadState.needLoad,
  },
};
