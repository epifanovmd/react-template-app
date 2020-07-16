import { Button } from "antd";
import { INormalizeData } from "Common/normalaizer";
import { popup } from "Common/popup";
import React, { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { IUser } from "src/api/dto/Users.g";

import { UsersActions } from "@/modules/users/reduxToolKit";

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

  const openModal = useCallback(() => {
    popup.modal({
      title: t("users"),
      params: { cancelText: "Закрыть", okButtonProps: { hidden: true } },
      render: () => (
        <Table>
          <TableHeader>
            <TableRow>
              <TableRowCell>{t("username")}</TableRowCell>
              <TableRowCell>{t("email")}</TableRowCell>
            </TableRow>
          </TableHeader>

          {users &&
            (users.keys || []).map(key => {
              const item = users.values[key];

              return (
                item && (
                  <TableRow
                    key={item.id}
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={() => {
                      dispatch(UsersActions.remove(item.id));
                    }}
                  >
                    <TableRowCell label={t("username")}>
                      {item.username}
                    </TableRowCell>
                    <TableRowCell label={t("email")}>{item.email}</TableRowCell>
                  </TableRow>
                )
              );
            })}
        </Table>
      ),
    });
  }, [dispatch, t, users]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableRowCell>{t("username")}</TableRowCell>
          <TableRowCell>{t("email")}</TableRowCell>
        </TableRow>
      </TableHeader>

      {users &&
        (users.keys || []).map(key => {
          const item = users.values[key];

          return (
            item && (
              <TableRow
                key={item.id}
                // eslint-disable-next-line react/jsx-no-bind
                onClick={() => {
                  dispatch(UsersActions.remove(item.id));
                }}
              >
                <TableRowCell label={t("username")}>
                  {item.username}
                </TableRowCell>
                <TableRowCell label={t("email")}>{item.email}</TableRowCell>
              </TableRow>
            )
          );
        })}
      <Button
        // eslint-disable-next-line react/jsx-no-bind
        onClick={() => {
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
        }}
      >
        Добавить
      </Button>

      <Button onClick={openModal}>Открыть модальное окно</Button>
    </Table>
  );
});
