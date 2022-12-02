import { makeAutoObservable } from "mobx";
import { Location } from "history";
import { parse } from "query-string";
import { NavigateFunction } from "react-router";
import { NavigateOptions } from "react-router/lib/hooks";
import { RoutePaths } from "../../routes";
import { INavigationPath } from "./Navigation.types";
import { iocDecorator } from "react-frontend-lib";

export const INavigationService = iocDecorator<NavigationService>();

@INavigationService({ inSingleton: true })
export class NavigationService {
  private _location: Location | undefined = undefined;
  private _navigate: NavigateFunction | undefined = undefined;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get pathname() {
    return this._location?.pathname || "/";
  }

  get search() {
    return parse(this._location?.search || "");
  }

  get state() {
    return this._location?.state;
  }

  goBack() {
    this._navigate?.(-1);
  }

  to(to: INavigationPath, options?: NavigateOptions) {
    this._navigate?.(to, options);
  }

  get redirect() {
    return (this.search.redirect as string) || "";
  }

  toPath(pathname: RoutePaths, options?: NavigateOptions) {
    this._navigate?.({ pathname }, options);
  }

  toSearch(search: string, options?: NavigateOptions) {
    this._navigate?.({ search }, options);
  }

  _init(
    navigate: NavigateFunction | undefined,
    location: Location | undefined,
  ) {
    if (location) {
      this._location = location;
    }
    if (navigate) {
      this._navigate = navigate;
    }
  }
}
