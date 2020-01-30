import { useHistory, useLocation } from "react-router";
import { QueryString } from "./query";

interface IUseRouteProps<T> {
  queryParams?: T;
  pathname?: string;
}

export const useRoute = <T>(): {
  push: ({ queryParams, pathname }: IUseRouteProps<T>) => void;
  replace: ({ queryParams, pathname }: IUseRouteProps<T>) => void;
} => {
  const location = useLocation();
  const { push, replace } = useHistory();

  return {
    push: ({ queryParams, pathname }): void => {
      let search = null;

      if (queryParams) {
        const query: T = QueryString.parse(location.search);
        const names = Object.keys(queryParams);

        names.map((name): void => {
          if (name) {
            if (
              !(queryParams as any)[name] &&
              {}.hasOwnProperty.call(query, name)
            ) {
              delete (query as any)[name];
            } else if ((queryParams as any)[name]) {
              (query as any)[name] = (queryParams as any)[name];
            }
          }
        });
        search = QueryString.stringify(query);
      }

      search && pathname
        ? push({ search, pathname })
        : pathname
        ? push({ pathname })
        : search && push({ search });
    },
    replace: ({ queryParams, pathname }) => {
      let search = null;

      if (queryParams) {
        const query: T = QueryString.parse(location.search);
        const names = Object.keys(queryParams);

        names.map((name): void => {
          if (name) {
            if (
              !(queryParams as any)[name] &&
              {}.hasOwnProperty.call(query, name)
            ) {
              delete (query as any)[name];
            } else if ((queryParams as any)[name]) {
              (query as any)[name] = (queryParams as any)[name];
            }
          }
        });
        search = QueryString.stringify(query);
      }

      search && pathname
        ? replace({ search, pathname })
        : pathname
        ? replace({ pathname })
        : search && replace({ search });
    },
  };
};
