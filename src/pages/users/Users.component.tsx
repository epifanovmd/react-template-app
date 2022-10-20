import React, { FC, useEffect } from "react";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";
import { UserList } from "../../components";
import { observer } from "mobx-react-lite";
import { IUsersVM } from "./Users.types";

interface IProps {}

const Users: FC<IProps> = observer(() => {
  const { loading, list, onRefresh, name } = IUsersVM.useInject();

  useEffect(() => {
    onRefresh().then();
  }, []);

  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("users")}</title>
      </Helmet>
      <div>{name}</div>
      <UserList users={list} />
    </>
  );
});

export default Users;
