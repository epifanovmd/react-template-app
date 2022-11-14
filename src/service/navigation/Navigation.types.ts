import { RoutePaths } from "../../routes";

export type INavigationPath =
  | RoutePaths
  | { pathname?: RoutePaths; search?: string };
