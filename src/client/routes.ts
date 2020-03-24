import * as React from "react";
import { RouteComponentProps } from "react-router";
import { SimpleThunk } from "Common/simpleThunk";
import { UsersAsyncActions } from "Modules/users/usersAsyncActions";
import loadable from "@loadable/component";

const Users = loadable(() => import("./modules/users/Users"));
const Form = loadable(() => import("./modules/form/form"));

export enum Roles {
  User = "User",
  Admin = "Admin",
}

export interface IRoute {
  path: string;
  pathName: string;
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  exact: boolean;
  getInitialData?: SimpleThunk;
  roles?: (keyof typeof Roles)[];
  Icon?: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}

export const getRoutsFromRole = (
  _routes: IRoute[],
  _roles: (keyof typeof Roles)[],
) => {
  return _routes.filter(
    ({ roles }) =>
      roles &&
      roles.some((item) => roles.some((itm) => Roles[itm] === Roles[item])),
  );
};

export const routepaths = {
  ROOT: "/",
  USERS: "/users",
  FORM: "/form",
};

export const routes: IRoute[] = [
  {
    path: routepaths.ROOT,
    pathName: "users",
    component: Users,
    exact: true,
    getInitialData: UsersAsyncActions.getUsers(),
  },
  {
    path: routepaths.FORM,
    pathName: "form",
    component: Form,
    exact: true,
  },
];
