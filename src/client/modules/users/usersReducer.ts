import {reducerWithInitialState} from "typescript-fsa-reducers";
import {IUsersState, usersInitialState} from "./IUsersState";
import {UsersActions} from "./usersActions";
import {newState} from "../../store/common/newState";
import {LoadState} from "../../common/loadState";
import {Success} from "typescript-fsa";
import {IEmpty} from "../../common/IEmpty";
import {IUser} from "../../api/dto/Users.g";
import {IResponse} from "../../common/response";

function getUsersStartedHandler(state: IUsersState) {
  return newState(state, {
    users: {
      ...state.users,
      loadState: LoadState.refreshing,
    },
  });
}

function getUsersDoneHandler(state: IUsersState, {result}: Success<IEmpty, IResponse<IUser[]>>) {
  return newState(state, newState(state, {
    users: {
      ...result,
      loadState: LoadState.idle,
    },
  }));
}

function getUsersFailedHandler(state: IUsersState) {
  return newState(state, newState(state, {
    users: {
      ...state.users,
      loadState: LoadState.error,
    },
  }));
}

export const usersReducer = reducerWithInitialState(usersInitialState)
  .case(UsersActions.getUsers.started, getUsersStartedHandler)
  .case(UsersActions.getUsers.done, getUsersDoneHandler)
  .case(UsersActions.getUsers.failed, getUsersFailedHandler)
  .build();
