import { fetchUsers } from "Modules/users/reduxToolKit";
import React, { FC, memo, useEffect } from "react";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "Store/IAppState";

import { UserList } from "@/components/userList/userList";

interface IProps {}

const Users: FC<IProps> = memo(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchUsers({
        onSuccess: ({ result }) => {
          console.log("-------", result.data);
        },
      }),
    );
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
