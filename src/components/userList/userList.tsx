import React from "react";
import "./styles.scss";
import {IUsers} from "../../api/dto/Users.g";

interface IProps {
  users: IUsers[];
}

export class UserList extends React.Component<IProps> {
  public render(): JSX.Element {
    const {users} = this.props;

    return (
      <div className={"container"}>
        <h3>USERS</h3>
        {users && users.map((item) => (<div key={item.id}>{item.name}</div>))}
      </div>
    );
  }
}