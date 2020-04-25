import loadable from "@loadable/component";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { SimpleThunk } from "Common/simpleThunk";
import { TestComponents } from "Modules/test/testComponents";
import { fetchUsers } from "Modules/users/reduxToolKit";
import * as React from "react";
import { RouteComponentProps } from "react-router";

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
  getInitialData?: SimpleThunk | AsyncThunkAction<any, any, any>;
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
      roles.some(item => roles.some(itm => Roles[itm] === Roles[item])),
  );

export const routepaths = {
  ROOT: "/",
  USERS: "/users",
  FORM: "/form",
  TESTCOMPONENTS: "/testComponents",
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
    path: routepaths.FORM,
    pathName: "form",
    component: Form,
    exact: true,
  },
  {
    path: routepaths.TESTCOMPONENTS,
    pathName: "test",
    component: TestComponents,
    exact: true,
  },
];
