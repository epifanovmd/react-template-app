import { LoadState } from "Common/helpers/loadState";
import { IUser } from "src/api/dto/Users.g";
import { IReduxData } from "Store/IAppState";

export interface IUsersState {
  users: IReduxData<{ [key: string]: IUser | undefined }>;
}

export const usersInitialState: IUsersState = {
  users: {
    data: {},
    loadState: LoadState.needLoad,
  },
};
