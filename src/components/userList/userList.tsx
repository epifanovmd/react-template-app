import { useBooleanState } from "Common/hooks/useBooleanState";
import { INormalizeData, useDeNormalizer } from "Common/normalizer";
import { Button } from "Components/controls/button/button";
import { Modal } from "Components/modal/modal";
import React, { FC, memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { IUser } from "src/api/dto/Users.g";

import { UsersActions } from "@/pages/users/reduxToolKit";

import { Table } from "../table/table";
import { TableHeader } from "../table/tableHeader";
import { TableRow } from "../table/tableRow";
import { TableRowCell } from "../table/tableRowCell";

interface IProps {
  users: INormalizeData<IUser, "id">;
}

export const UserList: FC<IProps> = memo(({ users }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [open, onOpen, onClose] = useBooleanState();

  const onAddUser = useCallback(() => {
    dispatch(
      UsersActions.set({
        key: 12344,
        value: () => ({
          name: "1234",
          email: "43254325",
          id: 12344,
          phone: "123456789654",
          username: "username",
          website: "dfsfsdgfdgfdgfd",
        }),
      }),
    );
  }, [dispatch]);

  const userList = useDeNormalizer(users, [users.keys]);

  const onRemove = useCallback(
    (id: number) => () => {
      dispatch(UsersActions.remove(id));
    },
    [dispatch],
  );

  const list = useMemo(
    () =>
      userList.map(item => (
        <TableRow key={item.id} onClick={onRemove(item.id)}>
          <TableRowCell label={t("username")}>{item.username}</TableRowCell>
          <TableRowCell label={t("email")}>{item.email}</TableRowCell>
        </TableRow>
      )),
    [onRemove, t, userList],
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

      <Button onClick={onAddUser}>Добавить</Button>

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
