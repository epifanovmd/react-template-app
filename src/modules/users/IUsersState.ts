import { LoadState } from "Common/loadState";
import { INormalizeData } from "Common/normalaizer";
import { IUser } from "src/api/dto/Users.g";
import { IReduxData } from "Store/IAppState";

export interface IUsersState {
  users: IReduxData<INormalizeData<IUser, "id">>;
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
