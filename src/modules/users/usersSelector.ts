import {IAppState} from "../../store/IAppState";
import {UsersThunk} from "./usersThunk";
import {Dispatch} from "react";
import {IUsersDispatchProps, IUsersStateProps} from "./Users";
import {ICallback} from "../../common/ICallback";
import {IUsers} from "../../api/dto/Users.g";

class UsersSelector {
  mapState = ({users}: IAppState): IUsersStateProps => (
    {
      users: users.users,
      usersLoadState: users.usersLoadState,
    }
  );

  mapDispatch = (dispatch: Dispatch<any>): IUsersDispatchProps => (
    {
      getUsers: (callback?: ICallback<IUsers[], void>): void => {
        return dispatch(UsersThunk.getUsers(callback));
      },
    });
}

export const usersSelector = new UsersSelector();
