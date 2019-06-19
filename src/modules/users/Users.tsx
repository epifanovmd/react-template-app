import React, {Component} from "react";
import {usersSelector} from "./usersSelector";
import {connect} from "react-redux";
import {LoadState} from "../../common/loadState";
import {UserList} from "../../components/userList/userList";
import {IUsers} from "../../api/dto/Users.g";
import {ICallback} from "../../common/ICallback";
import {compose} from "redux";
import {RouteComponentProps, withRouter} from "react-router";
import {pushNewURL} from "../../common/query";

export interface IUsersStateProps {
  users: IUsers[];
  usersLoadState: LoadState;
}

export interface IUsersDispatchProps {
  getUsers: (callback?: ICallback<IUsers[], void>) => void;
}

type TProps = IUsersStateProps & IUsersDispatchProps & RouteComponentProps;

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
        <UserList users={this.props.users} />
        <div onClick={this.setQuery}>SetQuery</div>
      </>
    );
  }

  private setQuery = (): void => {
    pushNewURL({pathname: "search", name: "search", value: "form"}, {...this.props});
  };
}

export const Users = compose<any>(
  withRouter,
  connect(usersSelector.mapState, usersSelector.mapDispatch),
)(UsersStatic);
