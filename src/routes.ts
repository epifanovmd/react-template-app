import * as React from "react";
import {RouteComponentProps} from "react-router";
import {RenderComponent} from "./components/renderComponent/renderComponent";

// const Users = lazy(() => import("./modules/users/Users"));
// const UseFormComponent = lazy(() => import("./modules/useForm/UseForm"));
// const TestPage = lazy(() => import("./modules/testPage/TestPage"));
// const TestRender = lazy(() => import("./modules/testRender/testRender"));

export interface IRoute {
  path: string;
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  exact: boolean;
}

export const routes: IRoute[] = [
  // {
  //   path: "/",
  //   component: Users,
  //   exact: true,
  // },
  // {
  //   path: "/useform",
  //   component: UseFormComponent,
  //   exact: true,
  // },
  // {
  //   path: "/test",
  //   component: TestPage,
  //   exact: true,
  // },
  {
    path: "/testRender",
    component: RenderComponent,
    exact: true,
  },
];
