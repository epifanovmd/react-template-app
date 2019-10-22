import React, {FC} from "react";
import {IUsers} from "../../api/dto/Users.g";

import styles from "./styles.scss";

interface IProps {
  users: IUsers[];
}

export const UserList: FC<IProps> = ({users}) => {

  return (
    <div className={styles.container}>
      <h3>USERS</h3>
      {
        users && users.map(item => (<div key={item.id}>{item.name}</div>))
      }
    </div>
  );
};
