import React, {FC} from "react";
import {IUsers} from "../../api/dto/Users.g";

interface IProps {
  users: IUsers[];
}

export const UserList: FC<IProps> = ({users}): JSX.Element => {

  return (
    <div className={"container"}>
      <h3>USERS</h3>
      {
        users && users.map(item => (<div key={item.id}>{item.name}</div>))
      }
    </div>
  );
};
