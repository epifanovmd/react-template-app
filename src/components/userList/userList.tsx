import React, { FC, memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { Table } from "../table/table";
import { TableHeader } from "../table/tableHeader";
import { TableRow } from "../table/tableRow";
import { TableRowCell } from "../table/tableRowCell";
import { IUser } from "../../api/dto/Users.g";
import { useBooleanState } from "../../common";
import { Modal } from "../modal/modal";
import { Button } from "../controls/button/button";

interface IProps {
  users: { [key: string]: IUser | undefined };
}

export const UserList: FC<IProps> = memo(({ users }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [open, onOpen, onClose] = useBooleanState();

  const list = useMemo(
    () =>
      Object.keys(users).map(key => {
        const item = users[key]!;

        return (
          <TableRow key={item.id}>
            <TableRowCell label={t("username")}>{item.username}</TableRowCell>
            <TableRowCell label={t("email")}>{item.email}</TableRowCell>
          </TableRow>
        );
      }),
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
