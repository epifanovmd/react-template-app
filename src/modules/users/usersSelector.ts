import {IAppState} from "../../store/IAppState";
import {UsersThunk} from "./usersThunk";
import {IUsersDispatchProps, IUsersStateProps} from "./Users";
import {IUsers} from "../../api/dto/Users.g";
import {SimpleDispatch} from "../../common/simpleThunk";

class UsersSelector {
  mapState = ({users}: IAppState): IUsersStateProps => (
    {
      users: users.users,
      usersLoadState: users.usersLoadState,
    }
  );

  mapDispatch = (dispatch: SimpleDispatch): IUsersDispatchProps => (
    {
      getUsers: (callback?: (users: IUsers[]) => void): void => {
        return dispatch(UsersThunk.getUsers(callback));
      },
    });
}

export const usersSelector = new UsersSelector();
