import {LoadState} from "../../common/loadState";
import {IUsers} from "../../api/dto/Users.g";
import {IResponse} from "../../common/response";

export interface IUsersState {
  users: IResponse<IUsers[]>;
}

export const usersInitialState: IUsersState = {
  users: {
    items: [],
    loadState: LoadState.needLoad,
  },
};
