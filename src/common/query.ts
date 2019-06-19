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

export const queryStringToObject = (queryString: string): any => {
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

interface IUrlProps {
  name?: string;
  value?: string;
  pathname?: string;
}

export const pushNewURL = ({name, value, pathname}: IUrlProps, RouteProps: RouteComponentProps): void => {
  const {
    location: {search},
    history: {push},
  } = RouteProps;

  const query = queryStringToObject(search);
  if (name) {
    if (!value && {}.hasOwnProperty.call(query, name)) {
      delete query[name];
    } else if (value) {
      query[name] = value;
    }
  }

  delete query["page"];

  push({search: queryObjectToString(query), pathname});
};
