import { useOutsideClick } from "Common/useOutsideClick";
import { fetchUsers } from "Modules/users/reduxToolKit";
import React, {
  createRef,
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "Store/IAppState";

import { UserList } from "@/components/userList/userList";

import { UsersAsyncActions } from "./usersAsyncActions";

interface IProps {}

const Users: FC<IProps> = memo(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(
    //   UsersAsyncActions.getUsers(result => {
    //     console.log("-------", result);
    //   }),
    // );
    dispatch(fetchUsers());
  }, [dispatch]);
  const { t } = useTranslation();
  const users = useSelector((state: IAppState) => state.usersPage.users);

  return (
    <>
      <Helmet>
        <title>{t("users")}</title>
      </Helmet>
      <UserList users={users.data} />
    </>
  );
});

export default Users;
