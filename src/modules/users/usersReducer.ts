import { reducerWithInitialState } from "typescript-fsa-reducers";
import { IUsersState, usersInitialState } from "./IUsersState";
import { UsersActions } from "./usersActions";
import { newState } from "../../store/common/newState";
import { LoadState } from "Common/loadState";
import { Success } from "typescript-fsa";
import { IEmpty } from "Common/IEmpty";
import { IUser } from "src/api/dto/Users.g";
import { IResponse } from "../../api";

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
