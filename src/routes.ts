import loadable from "@loadable/component";
import { AsyncThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Action } from "redux";
import { IAppState } from "./store/IAppState";
import { IExtraArguments } from "./store/store";
import { fetchUsers } from "./pages/users/reduxToolKit";
import { Auth } from "./pages/auth/auth";
import { IResponse } from "./api";

const Users = loadable(() => import("./pages/users/Users"));

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
  getInitialData?: AsyncThunkAction<
    IResponse<any>,
    any,
    {
      dispatch: ThunkDispatch<IAppState, IExtraArguments, Action>;
      state: IAppState;
      extra: IExtraArguments;
    }
  >;
  roles?: (keyof typeof Roles)[];
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

export const routepaths = {
  ROOT: "/",
  USERS: "/users",
  AUTH: "/auth",
};

export const routes: IRoute[] = [
  {
    path: routepaths.ROOT,
    pathName: "users",
    component: Users,
    exact: true,
    getInitialData: fetchUsers(),
  },
  {
    path: routepaths.AUTH,
    pathName: "auth",
    component: Auth,
    exact: true,
  },
];
