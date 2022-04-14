import loadable from "@loadable/component";
import * as React from "react";
import { usersVM } from "./pages/users/Users.vm";

const Users = loadable(() => import("./pages/users/Users.component"));
const Auth = loadable(() => import("./pages/auth/Auth.component"));

export enum Roles {
  User = "User",
  Admin = "Admin",
}

export interface IRoute<T extends string = string> {
  path: string;
  pathName: T;
  component: any;
  exact: boolean;
  roles?: (keyof typeof Roles)[];
  getInitialData?: () => Promise<any>;
  Icon?: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}

export const getRoutsFromRole = (
  _routes: IRoute[],
  _roles: (keyof typeof Roles)[],
) =>
  _routes.filter(
    ({ roles }) =>
      roles &&
      _roles &&
      roles.some(item =>
        _roles.some(
          itm => Roles[itm] && Roles[item] && Roles[itm] === Roles[item],
        ),
      ),
  );

export enum routepaths {
  ROOT = "/",
  USERS = "/users",
  AUTH = "/auth",
}

export const routes: IRoute[] = [
  {
    path: routepaths.ROOT,
    pathName: "users",
    component: Users,
    exact: true,
    getInitialData: usersVM.onRefresh,
  },
  {
    path: routepaths.AUTH,
    pathName: "auth",
    component: Auth,
    exact: true,
  },
];
