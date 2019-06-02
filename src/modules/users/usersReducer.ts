import {reducerWithInitialState} from "typescript-fsa-reducers";
import {IUsersState, usersInitialState} from "./IUsersState";
import {UsersActions} from "./usersActions";
import {newState} from "../../store/common/newState";
import {LoadState} from "../../common/loadState";
import {Success} from "typescript-fsa";
import {IEmpty} from "../../common/IEmpty";
import {IUsers} from "../../api/dto/Users.g";

function getUsersStartedHandler(state: IUsersState): IUsersState {
  return newState(state, {usersLoadState: LoadState.refreshing});
}

function getUsersDoneHandler(state: IUsersState, {result: users}: Success<IEmpty, IUsers[]>): IUsersState {
  return newState(state, newState(state, {usersLoadState: LoadState.idle, users}));
}

function getUsersFailedHandler(state: IUsersState): IUsersState {
  return newState(state, newState(state, {usersLoadState: LoadState.error}));
}

export const usersReducer = reducerWithInitialState(usersInitialState)
  .case(UsersActions.getUsers.started, getUsersStartedHandler)
  .case(UsersActions.getUsers.done, getUsersDoneHandler)
  .case(UsersActions.getUsers.failed, getUsersFailedHandler)
  .build();