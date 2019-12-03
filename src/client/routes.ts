import * as React from "react";
import {RouteComponentProps} from "react-router";
import {SimpleThunk} from "./common/simpleThunk";
import {UsersThunk} from "./modules/users/usersThunk";
import loadable from "@loadable/component";

const TestPage = loadable(() => import("./modules/testPage/TestPage"), { ssr: true });
const UseFormComponent = loadable(() => import("./modules/useForm/UseForm"), { ssr: true });
const Users = loadable(() => import("./modules/users/Users"), { ssr: true });
const TestRender = loadable(() => import("./modules/testRender/testRender"), { ssr: true });

export interface IRoute {
  path: string;
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  exact: boolean;
  getInitialData?: SimpleThunk;
}

export const routes: IRoute[] = [
  {
    path: "/",
    component: Users,
    exact: true,
    getInitialData: UsersThunk.getUsers(),
  },
  {
    path: "/useform",
    component: UseFormComponent,
    exact: true,
    getInitialData: UsersThunk.getUsers(),
  },
  {
    path: "/test",
    component: TestPage,
    exact: true,
  },
  {
    path: "/testRender",
    component: TestRender,
    exact: true,
  },
];
