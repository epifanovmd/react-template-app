import * as React from "react";
import {RouteComponentProps} from "react-router";
import {SimpleThunk} from "./common/simpleThunk";
import {UsersThunk} from "./modules/users/usersThunk";
import loadable from "@loadable/component";

const Users = loadable(() => import("./modules/users/Users"));
const Messages = loadable(() => import("./modules/messages/messages"));
// const Registration = loadable(() => import("./modules/authentication/registration/Registration"));

// import TestPage from "./modules/testPage/TestPage";
// import UseFormComponent from "./modules/useForm/UseForm";
// import Users from "./modules/users/Users";
// import TestRender from "./modules/testRender/testRender";

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
    path: "/messages",
    component: Messages,
    exact: true,
  },
  // {
  //   path: "/registration",
  //   component: Registration,
  //   exact: true,
  // },
];
