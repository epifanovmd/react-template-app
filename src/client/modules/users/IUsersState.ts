import { LoadState } from "../../common/loadState";
import { IUser } from "../../api/dto/Users.g";
import { IResponse } from "../../common/response";

export interface IUsersState {
  users: IResponse<IUser[]>;
}

export const usersInitialState: IUsersState = {
  users: {
    data: [],
    loadState: LoadState.needLoad,
  },
};
