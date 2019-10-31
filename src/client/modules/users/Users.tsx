import React, {Component} from "react";
import {usersSelector} from "./usersSelector";
import {connect} from "react-redux";
import {UserList} from "../../components/userList/userList";
import {RouteComponentProps, withRouter} from "react-router";
import {pushRoute, queryStringToObject} from "../../common/query";
import Helmet from "react-helmet";

export interface IUsersQuery {
  search: string;
}

interface IProps {
}

type TProps =
  IProps &
  ReturnType<typeof usersSelector.mapState> &
  ReturnType<typeof usersSelector.mapDispatch> &
  RouteComponentProps<IRouteParams>;

interface IRouteParams {
  id: string;
}

class UsersStatic extends Component<TProps> {
  componentDidMount() {
    this.props.getUsers((result) => {
      console.log("-------", result);
    });

    console.log("+++++++++");
  }

  public render() {
    const {location: {search}, match} = this.props;
    const query = queryStringToObject<IUsersQuery>(search);

    console.log("query", query.search);
    console.log("match", match.params.id);

    return (
      <>
        <Helmet>
          <title>Users</title>
        </Helmet>
        <UserList users={this.props.users.items} />
        <div>{`Search - ${query.search}`}</div>
        <div onClick={this.setQuery}>SetQuery</div>
      </>
    );
  }

  private setQuery = (): void => {
    pushRoute<IUsersQuery>({queryParams: {search: "22"}}, {...this.props});
  };
}

export const Users = withRouter(connect(usersSelector.mapState, usersSelector.mapDispatch)(UsersStatic));
