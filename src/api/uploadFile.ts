import { IResponse } from "./baseFetch";
import { RequestType } from "Common/helpers/requestType";

interface IParams<P> {
  url: string;
  file: File;
  params?: P;
  method?: RequestType;
  headers?: { [key: string]: string };
  filePropertyName?: string;
}

const PORT = process.env.PORT || 8080;

export const uploadFile = async <P, R>({
  url,
  file,
  method = RequestType.POST,
  headers = {},
  filePropertyName = "filePropertyName",
}: IParams<P>): Promise<IResponse<R>> => {
  const urlResult = `/api/${url}`;

  const formData = new FormData();

  formData.append(filePropertyName, file);

  try {
    const res = await fetch(`http://localhost:${PORT}${urlResult}`, {
      method,
      body: formData,
      headers: { ...headers },
    });

    const status = res.status;

    if (status === 401) {
      return {
        data: {} as R,
        status: 401,
        message: "401",
      };
    }

    const json = (await res?.json().catch(() => ({}))) || {};

    return {
      data: json as R,
      status,
    };
  } catch (error: any) {
    return {
      data: {} as R,
      status: 900,
      error: error as Error,
      message: error.message,
    };
  }
};
