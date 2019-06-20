import React, {Component} from "react";
import {usersSelector} from "./usersSelector";
import {connect} from "react-redux";
import {LoadState} from "../../common/loadState";
import {UserList} from "../../components/userList/userList";
import {IUsers} from "../../api/dto/Users.g";
import {ICallback} from "../../common/ICallback";
import {compose} from "redux";
import {RouteComponentProps, withRouter} from "react-router";
import {pushNewURL, queryStringToObject} from "../../common/query";

export interface IUsersStateProps {
  users: IUsers[];
  usersLoadState: LoadState;
}

export interface IUsersDispatchProps {
  getUsers: (callback?: ICallback<IUsers[], void>) => void;
}

interface IRouteParams {
  id: string;
}

type TProps = IUsersStateProps & IUsersDispatchProps & RouteComponentProps<IRouteParams>;

class UsersStatic extends Component<TProps> {
  componentDidMount(): void {
    this.props.getUsers((result) => {
      console.log("-------", result);
    });

    console.log("+++++++++");
  }

  public render(): JSX.Element {
    const {location: {search}, match} = this.props;
    const query = queryStringToObject<"users">(search);

    console.log("query", query.search);
    console.log("match", match.params.id);

    return (
      <>
        <UserList users={this.props.users} />
        <div onClick={this.setQuery}>SetQuery</div>
      </>
    );
  }

  private setQuery = (): void => {
    pushNewURL<"users">({queryParams: {search: "22"}}, {...this.props});
  };
}

export const Users = compose<any>(
  withRouter,
  connect(usersSelector.mapState, usersSelector.mapDispatch),
)(UsersStatic);
