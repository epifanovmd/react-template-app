import React, {Component} from "react";
import {usersSelector} from "./usersSelector";
import {connect} from "react-redux";
import {LoadState} from "../../common/loadState";
import {UserList} from "../../components/userList/userList";
// import "../../assets/clearfix.scss";
import {IUsers} from "../../api/dto/Users.g";
import {ICallback} from "../../common/ICallback";

export interface IUsersStateProps {
  users: IUsers[];
  usersLoadState: LoadState;
}

export interface IUsersDispatchProps {
  getUsers: (callback?: ICallback<IUsers[], void>) => void;
}

type TProps = IUsersStateProps & IUsersDispatchProps;

class UsersStatic extends Component<TProps> {
  componentDidMount(): void {
    this.props.getUsers((result) => {
      console.log("-------", result);
    });

    console.log("+++++++++");
  }

  public render(): JSX.Element {
    return (
      <>
        <UserList users={this.props.users}/>
      </>
    );
  }
}

export const Users = connect(usersSelector.mapState, usersSelector.mapDispatch)(UsersStatic);
