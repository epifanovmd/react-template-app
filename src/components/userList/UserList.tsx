import React, { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Table, TableHeader, TableRow, TableRowCell } from "../table";
import { useBooleanState } from "../../common";
import { IUser } from "../../pages/users/Users.types";
import { Modal } from "../modal";
import { Button } from "../ui";
import { observer } from "mobx-react-lite";

interface IProps {
  users: IUser[];
}

export const UserList: FC<IProps> = observer(({ users }) => {
  const { t } = useTranslation();

  const [open, onOpen, onClose] = useBooleanState();

  const list = useMemo(
    () =>
      users.map(item => (
        <TableRow key={item.id}>
          <TableRowCell label={t("username")}>{item.username}</TableRowCell>
          <TableRowCell label={t("email")}>{item.email}</TableRowCell>
        </TableRow>
      )),
    [t, users],
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableRowCell>{t("username")}</TableRowCell>
          <TableRowCell>{t("email")}</TableRowCell>
        </TableRow>
      </TableHeader>
      {list}
      <Modal open={open} onClose={onClose}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableRowCell>{t("username")}</TableRowCell>
              <TableRowCell>{t("email")}</TableRowCell>
            </TableRow>
          </TableHeader>

          {list}
        </Table>
      </Modal>
      <Button onClick={onOpen}>Открыть модальное окно</Button>
    </Table>
  );
});
