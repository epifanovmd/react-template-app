export const QueryString = {
  stringify: (queryObject: any): string => {
    if (queryObject && Object.keys(queryObject).length > 0) {
      const queryString = Object.keys(queryObject)
        .map((key: string) => {
          return `${key}=${queryObject[key]}`;
        })
        .join("&");

      if (queryString) {
        return `?${queryString}`;
      }
    }

    return "";
  },
  parse: <T>(queryString: string): T => {
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
  },
};
