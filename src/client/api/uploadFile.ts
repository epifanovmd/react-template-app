// import { RequestType } from "../common/requestType";
// import { IResponse } from "../common/response";
//
// interface IParams<P, R> {
//   url: string;
//   // tslint:disable-next-line:no-any
//   file: any;
//   params?: P;
//   method?: RequestType;
//   headers?: { [key: string]: string };
//   filePropertyName?: string;
//   fileName?: string;
// }
//
// export const uploadFile = async <P, R>({
//   url,
//   file,
//   method = RequestType.POST,
//   headers = {},
//   filePropertyName = "filePhoto",
//   fileName,
// }: IParams<P, R>): Promise<IResponse<R>> => {
//   const urlResult = `/api/${url}`;
//
//   const formData = new FormData();
//   formData.append(filePropertyName, file, fileName);
//
//   try {
//     const res = await fetch(urlResult, {
//       method,
//       body: formData,
//       headers: {
//         ...headers,
//       },
//     });
//
//     const status = res.status;
//     if (status === 401) {
//       return {
//         result: null,
//         status: 401,
//         error: null,
//         message: "401",
//       };
//     }
//
//     const json = await res.json() || {};
//
//     return { result: json as R, status, error: null, message: null };
//   } catch (error) {
//     return {
//       result: null,
//       status: 900,
//       error: error as Error,
//       message: error.message,
//     };
//   }
// };
