import React, { FC, memo, useEffect } from "react";
import { UserList } from "Components/userList/userList";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { UsersAsyncActions } from "./usersAsyncActions";
import { IAppState } from "Store/IAppState";
import { useTranslation } from "react-i18next";

interface IProps {}

const Users: FC<IProps> = memo(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      UsersAsyncActions.getUsers((result) => {
        console.log("-------", result);
      }),
    );
  }, []);

  const { t } = useTranslation();
  const users = useSelector((state: IAppState) => state.usersPage.users);
  console.log(users.data);

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
