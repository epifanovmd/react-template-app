import { IEmpty } from "Common/IEmpty";
import { LoadState } from "Common/loadState";
import { IUser } from "src/api/dto/Users.g";
import { newState } from "Store/common/newState";
import { Success } from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";

import { IResponse } from "@/api";

import { IUsersState, usersInitialState } from "./IUsersState";
import { UsersActions } from "./usersActions";

function getUsersStartedHandler(state: IUsersState) {
  return newState(state, {
    users: {
      ...state.users,
      loadState: LoadState.refreshing,
    },
  });
}

function getUsersDoneHandler(
  state: IUsersState,
  { result }: Success<IEmpty, IResponse<IUser[]>>,
) {
  return newState(
    state,
    newState(state, {
      users: {
        data: result.data,
        loadState: LoadState.idle,
      },
    }),
  );
}

function getUsersFailedHandler(state: IUsersState) {
  return newState(
    state,
    newState(state, {
      users: {
        ...state.users,
        loadState: LoadState.error,
      },
    }),
  );
}

export const usersReducer = reducerWithInitialState(usersInitialState)
  .case(UsersActions.getUsers.started, getUsersStartedHandler)
  .case(UsersActions.getUsers.done, getUsersDoneHandler)
  .case(UsersActions.getUsers.failed, getUsersFailedHandler)
  .build();
