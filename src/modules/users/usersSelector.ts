import {IAppState} from "../../store/IAppState";
import {UsersThunk} from "./usersThunk";
import {Dispatch} from "react";
import {IUsersDispatchProps, IUsersStateProps} from "./Users";

class UsersSelector {
  mapState = ({users}: IAppState): IUsersStateProps => (
    {
      users: users.users,
      usersLoadState: users.usersLoadState,
    }
  );

  mapDispatch = (dispatch: Dispatch<any>): IUsersDispatchProps => (
    {
      getUsers: (): void => {
        dispatch(UsersThunk.getUsers());
      },
    });
}

export const usersSelector = new UsersSelector();