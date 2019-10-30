import * as React from "react";
import {RouteComponentProps} from "react-router";
import {TestPage} from "./modules/testPage/TestPage";
import {UseFormComponent} from "./modules/useForm/UseForm";
import {Users} from "./modules/users/Users";
import {TestRender} from "./modules/testRender/testRender";
import {SimpleThunk} from "./common/simpleThunk";
import {UsersThunk} from "./modules/users/usersThunk";

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
