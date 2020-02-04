import React, { FC, memo } from "react";
import {IUser, IUserDto} from "../../api/dto/Users.g";
import { Table } from "../table/table";
import { TableHeader } from "../table/tableHeader";
import { TableRow } from "../table/tableRow";
import { TableRowCell } from "../table/tableRowCell";
import { useTranslation } from "react-i18next";

interface IProps {
  users: IUser[];
}

export const UserList: FC<IProps> = memo(({ users }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableRowCell>{t("username")}</TableRowCell>
            <TableRowCell>{t("firstName")}</TableRowCell>
            <TableRowCell>{t("lastName")}</TableRowCell>
            <TableRowCell>{t("email")}</TableRowCell>
          </TableRow>
        </TableHeader>

        {users &&
          users.map((item) => (
            <TableRow key={item.id}>
              <TableRowCell label={t("username")}>{item.username}</TableRowCell>
              <TableRowCell label={t("firstName")}>
                {item.firstName}
              </TableRowCell>
              <TableRowCell label={t("lastName")}>{item.lastName}</TableRowCell>
              <TableRowCell label={t("email")}>{item.email}</TableRowCell>
            </TableRow>
          ))}
      </Table>
    </div>
  );
});
