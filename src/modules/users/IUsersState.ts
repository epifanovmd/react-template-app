import { LoadState } from "Common/loadState";
import { IUser } from "src/api/dto/Users.g";
import { IReduxData } from "Store/IAppState";

export interface IUsersState {
  users: IReduxData<IUser[]>;
}

export const usersInitialState: IUsersState = {
  users: {
    data: [],
    loadState: LoadState.needLoad,
  },
};
