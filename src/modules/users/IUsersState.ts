import { LoadState } from "Common/loadState";
import { INormalizeData } from "Modules/users/reduxToolKit";
import { IUser } from "src/api/dto/Users.g";
import { IReduxData } from "Store/IAppState";

export interface IUsersState {
  users: IReduxData<INormalizeData<IUser>>;
}

export const usersInitialState: IUsersState = {
  users: {
    data: {
      keys: [],
      values: {},
    },
    loadState: LoadState.needLoad,
  },
};
