import React, { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { IUser } from "src/api/dto/Users.g";

import { Table } from "../table/table";
import { TableHeader } from "../table/tableHeader";
import { TableRow } from "../table/tableRow";
import { TableRowCell } from "../table/tableRowCell";

interface IProps {
  users: IUser[];
}

export const UserList: FC<IProps> = memo(({ users }) => {
  const { t } = useTranslation();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableRowCell>{t("username")}</TableRowCell>
          <TableRowCell>{t("email")}</TableRowCell>
        </TableRow>
      </TableHeader>

      {users &&
        users.map(item => (
          <TableRow key={item.id}>
            <TableRowCell label={t("username")}>{item.username}</TableRowCell>
            <TableRowCell label={t("email")}>{item.email}</TableRowCell>
          </TableRow>
        ))}
    </Table>
  );
});
