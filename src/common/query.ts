import {RouteComponentProps} from "react-router";

export const queryObjectToString = (queryObject: any): string => {
  if (queryObject && Object.keys(queryObject).length > 0) {
    const queryString = Object
      .keys(queryObject)
      .map((key: string) => {
        return `${key}=${queryObject[key]}`;
      })
      .join("&");

    if (queryString) {
      return `?${queryString}`;
    }
  }

  return "";
};

export const queryStringToObject = <T>(queryString: string): T => {
  const searchQuery: any = {};

  (queryString || "")
    .replace("?", "")
    .split("&")
    .forEach((queryData: string) => {
      const args = queryData.split("=");

      if (args && args.length > 1) {
        searchQuery[args[0]] = args[1];
      }
    });

  return searchQuery;
};

interface IUrlProps<T> {
  queryParams?: T;
  pathname?: string;
}

export const pushRoute = <T>({queryParams, pathname}: IUrlProps<T>, RouteProps: RouteComponentProps): void => {
  const {
    location,
    history: {push},
  } = RouteProps;
  let search = null;

  if (queryParams) {

    const query: T = queryStringToObject(location.search);
    const names = Object.keys(queryParams);

    names.map((name): void => {
      if (name) {
        if (!(queryParams as any)[name] && {}.hasOwnProperty.call(query, name)) {
          delete (query as any)[name];
        } else if ((queryParams as any)[name]) {
          (query as any)[name] = (queryParams as any)[name];
        }
      }
    });
    search = queryObjectToString(query);
  }

  search && pathname ? push({search, pathname}) :
  pathname ? push({pathname}) :
  search && push({search});
};

export const replaceRoute = <T>({queryParams, pathname}: IUrlProps<T>, RouteProps: RouteComponentProps): void => {
  const {
    location,
    history: {replace},
  } = RouteProps;
  let search = null;

  if (queryParams) {

    const query: T = queryStringToObject(location.search);
    const names = Object.keys(queryParams);

    names.map((name): void => {
      if (name) {
        if (!(queryParams as any)[name] && {}.hasOwnProperty.call(query, name)) {
          delete (query as any)[name];
        } else if ((queryParams as any)[name]) {
          (query as any)[name] = (queryParams as any)[name];
        }
      }
    });
    search = queryObjectToString(query);
  }

  search && pathname ? replace({search, pathname}) :
    pathname ? replace({pathname}) :
      search && replace({search});
};
