import React, { FC, useEffect } from "react";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";
import { UserList } from "../../components";
import { usersVM } from "./Users.vm";
import { observer } from "mobx-react-lite";

interface IProps {}

const Users: FC<IProps> = observer(() => {
  const { loading, list, onRefresh, onSearch } = usersVM;

  useEffect(() => {
    onRefresh();
  }, []);

  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("users")}</title>
      </Helmet>
      <UserList users={list} />
    </>
  );
});

export default Users;
