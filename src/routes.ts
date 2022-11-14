import loadable from "@loadable/component";

const Users = loadable(() => import("./pages/users/Users.component"));
const Auth = loadable(() => import("./pages/auth/Auth.component"));

type GetInitialData = [string, () => Promise<any>];

export interface IRoute<T extends string = string> {
  path: string;
  pathName: T;
  component: any;
  children?: IRoute[];
  getInitialData?: GetInitialData[];
}

export enum routepaths {
  ROOT = "/",
  USERS = "/users",
  AUTH = "/auth",
}

export type RoutePaths = routepaths | string;

export const routes: IRoute[] = [
  {
    path: routepaths.ROOT,
    pathName: "users",
    component: Users,
    // getInitialData: IUsersVM.getInstance().onRefresh,
  },
  {
    path: routepaths.AUTH,
    pathName: "auth",
    component: Auth,
  },
];
