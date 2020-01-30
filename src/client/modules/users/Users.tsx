import React, { FC, memo, useEffect } from "react";
import { UserList } from "../../components/userList/userList";
import { useHistory, useLocation, useRouteMatch } from "react-router";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { UsersThunk } from "./usersThunk";
import { IAppState } from "../../store/IAppState";
import { useTranslation } from "react-i18next";
import { QueryString } from "../../common/query";
import { useRoute } from "../../common/useRoute";

export interface IUsersQuery {
  search?: string;
}

interface IProps {}

interface IRouteParams {
  id: string;
}

const Users: FC<IProps> = memo(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      UsersThunk.getUsers((result) => {
        console.log("-------", result);
      }),
    );

    console.log("+++++++++");
  }, []);

  const { t } = useTranslation();
  const match = useRouteMatch<IRouteParams>();
  const { push } = useRoute<IUsersQuery>();

  const query = QueryString.parse<IUsersQuery>(location.search);

  console.log("query", query.search);
  match && console.log("match id", match.params.id);

  const setQuery = (): void => {
    push({ queryParams: { search: "22" }, pathname: "111" });
  };
  const users = useSelector((state: IAppState) => state.usersPage.users);

  return (
    <>
      <Helmet>
        <title>{t("users")}</title>
      </Helmet>
      <UserList users={users.data} />
      <div>{`Search - ${query.search}`}</div>
      <div onClick={setQuery}>SetQuery</div>
    </>
  );
});

export default Users;
