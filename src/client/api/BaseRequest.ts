import { assertNotNull } from "../common/assertNotNull";
import { NoAuthError } from "../common/exceptionType";
import fetch from "isomorphic-unfetch";
/*tslint:disable*/

type Action<T> = () => T;
const port = process.env.PORT || 8080;

export class BaseRequest {
  static token: string;
  private emptyResponse: EmptyResponse;

  constructor(protected baseurl: string) {
    this.emptyResponse = new EmptyResponse();
  }

  static handleError = (error: any): Promise<any> => {
    return Promise.reject(error);
  };

  static getToken: Action<string> = () => BaseRequest.token;

  static setToken: (token: string) => void = (token) =>
    (BaseRequest.token = token);

  async fetch(url: string, config: RequestInit): Promise<any> {
    let headers: any = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (BaseRequest.getToken()) {
      headers = {
        ...headers,
        cookie: `token=${BaseRequest.token}`,
      };
    }
    if (process.env.NODE_ENV === "development") {
      console.log("URL - ", url);
    }
    const response = await fetch(
      `http://localhost:${port}` + url,
      Object.assign({ headers: headers }, config),
    );
    if (response.status == 401) {
      throw new NoAuthError("NoAuthorization");
    } else if (response.status == 204) {
      return this.emptyResponse;
    } else if (
      !response.status ||
      response.status < 200 ||
      response.status >= 300
    ) {
      const error = await response.json();
      throw error;
    }
    return response;
  }

  getObjectFlatter(): (param1: any, param2?: string) => string {
    const flatObject: any = {};
    const testMap = new Map<string, any>();
    let i = 0;

    return function objectToFlat(node: any, parentName?: string): string {
      let queryArgs: string[] = [];
      parentName = parentName ? parentName : "";

      if (node instanceof Object) {
        for (const subNodeName in node) {
          if (node[subNodeName] instanceof Object) {
            objectToFlat(node[subNodeName], subNodeName);
          } else {
            const newNodeValue = node[subNodeName];
            let fixedSubNodeName = "." + subNodeName;

            if (
              typeof subNodeName === "number" ||
              (typeof subNodeName === "string" && !isNaN(Number(subNodeName)))
            ) {
              fixedSubNodeName = "";
            }

            const newNodeName =
              parentName === "" ? subNodeName : parentName + fixedSubNodeName;

            if (newNodeValue) {
              testMap.set(i.toString(), {
                keyObject: newNodeName,
                valueObject: newNodeValue,
              });
              i++;
              flatObject[newNodeName] = newNodeValue;
            }
          }
        }
      }

      testMap.forEach((item) =>
        queryArgs.push(item.keyObject + "=" + item.valueObject),
      );

      const query = queryArgs.join("&");
      return query ? `?${query}` : "";
    };
  }

  protected q(params: {
    [key: string]: string | number | boolean | string | Date | null;
  }): string {
    const query = Object.keys(params)
      .filter((k) => params[k] != null)
      .map(
        (k) =>
          `${k}=${encodeURIComponent(assertNotNull(params[k]).toString())}`,
      )
      .join("&");

    return query ? `?${query}` : "";
  }
}

class EmptyResponse {
  public json(): any {
    return null;
  }
}
