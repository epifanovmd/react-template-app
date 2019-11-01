import React, {FC, memo} from "react";
import {IUser} from "../../api/dto/Users.g";

interface IProps {
  users: IUser[];
}

export const UserList: FC<IProps> = memo(({users}) => {

  return (
    <div>
      <h3>USERS</h3>
      {
        users && users.map(item => (<div key={item.id}>{item.name}</div>))
      }
    </div>
  );
});
