import querystring from "query-string";
import { RequestType } from "Common/helpers/requestType";
import { IEmpty } from "Common/helpers/IEmpty";

export interface IResponse<R> {
  data: R;
  status: number;
  error?: Error;
  message?: string;
}

const getUrl = <P>(url: string, method: RequestType, params: P | IEmpty = {}) =>
  method !== RequestType.GET
    ? `/api/${url}`
    : `/api/${url}${
        Object.keys(params).length > 0 ? "?" : ""
      }${querystring.stringify(params)}`;

export const baseFetch = async <R, P>(
  url: string,
  params: P | IEmpty = {},
  method: RequestType = RequestType.GET,
  headers: { [key: string]: string } = {},
): Promise<IResponse<R>> => {
  const body =
    method !== RequestType.GET ? { body: JSON.stringify(params) } : {};

  try {
    const res = await fetch(getUrl(url, method, params), {
      method,
      ...body,
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
      },
    });

    const json = (await res?.json().catch(() => ({}))) || {};
    const status = res.status;

    return {
      data: json as any,
      status,
    };
  } catch (error: any) {
    return {
      data: {} as R,
      status: 500,
      error: error as Error,
      message: error.message,
    };
  }
};
