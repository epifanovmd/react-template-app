import { IReduxData } from "../../store/IAppState";
import { IUser } from "../../api/dto/Users.g";
import { LoadState } from "../../common";

export interface IUsersState {
  users: IReduxData<{ [key: string]: IUser | undefined }>;
}

export const usersInitialState: IUsersState = {
  users: {
    data: {},
    loadState: LoadState.needLoad,
  },
};
