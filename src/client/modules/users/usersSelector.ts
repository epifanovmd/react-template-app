import {IAppState} from "../../store/IAppState";
import {UsersThunk} from "./usersThunk";
import {IUser} from "../../api/dto/Users.g";
import {SimpleDispatch} from "../../common/simpleThunk";

class UsersSelector {
  mapState = ({usersPage}: IAppState) => (
    {
      users: usersPage.users,
    }
  );

  mapDispatch = (dispatch: SimpleDispatch) => (
    {
      getUsers: (callback?: (users: IUser[]) => void) => {
        return dispatch(UsersThunk.getUsers(callback));
      },
    });
}

export const usersSelector = new UsersSelector();
