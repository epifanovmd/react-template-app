import loadable from "@loadable/component";

const Users = loadable(() => import("./pages/users/Users.component"));
const Auth = loadable(() => import("./pages/auth/Auth.component"));

export enum Roles {
  User = "User",
  Admin = "Admin",
}

type GetInitialData = [string, () => Promise<any>];

export interface IRoute<T extends string = string> {
  path: string;
  pathName: T;
  component: any;
  exact: boolean;
  roles?: (keyof typeof Roles)[];
  getInitialData?: GetInitialData[];
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
    // getInitialData: IUsersVM.getInstance().onRefresh,
  },
  {
    path: routepaths.AUTH,
    pathName: "auth",
    component: Auth,
    exact: true,
  },
];
