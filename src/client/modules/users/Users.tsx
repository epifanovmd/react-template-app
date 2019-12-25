import React, {FC, memo, useEffect} from "react";
import {UserList} from "../../components/userList/userList";
import {useHistory, useLocation, useRouteMatch} from "react-router";
import {pushRoute, queryStringToObject} from "../../common/query";
import Helmet from "react-helmet";
import {useDispatch, useSelector} from "react-redux";
import {UsersThunk} from "./usersThunk";
import {IAppState} from "../../store/IAppState";
import {useTranslation} from "react-i18next";

export interface IUsersQuery {
  search: string;
}

interface IProps {
}

interface IRouteParams {
  id: string;
}

const UsersStatic: FC<IProps> = memo(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UsersThunk.getUsers((result) => {
      console.log("-------", result);
    }));

    console.log("+++++++++");
  }, []);

  const {t} = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch<IRouteParams>();

  const query = queryStringToObject<IUsersQuery>(location.search);

  console.log("query", query.search);
  match && console.log("match id", match.params.id);

  const setQuery = (): void => {
    pushRoute<IUsersQuery>({queryParams: {search: "22"}}, {history, location});
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

export default UsersStatic;
