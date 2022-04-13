import { createAsyncThunk } from "@reduxjs/toolkit";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { IAppState } from "../IAppState";
import { IExtraArguments } from "../store";
import { baseFetch, IResponse } from "../../api";
import { RequestType } from "../../common";

export interface IFetchParams<R, QP, P> {
  url:
    | ((
        args: QP extends void
          ? P extends void
            ? void
            : P
          : P extends void
          ? { params: QP }
          : { params: QP } & P,
      ) => string)
    | string;
  method: RequestType;
  headers?: { [key: string]: string };
  actionType: string;
  transformData?: (result: R, getState: () => IAppState) => R;
  mockData?: (params: QP) => R;
}

type TCalcType<QP, P> = QP extends void
  ? {} & (P extends void ? void : { args: P })
  : P extends void
  ? { params: QP }
  : { args: P } & { params: QP };

export const callApiToolkit = <R, QP = void, P = void>({
  url,
  method,
  headers,
  actionType,
  transformData,
  mockData,
}: IFetchParams<R, QP, P>) =>
  createAsyncThunk<
    IResponse<R>,
    QP extends void
      ? P extends void
        ? void
        : TCalcType<QP, P>
      : TCalcType<QP, P>,
    {
      dispatch: ThunkDispatch<IAppState, IExtraArguments, Action>;
      state: IAppState;
      extra: IExtraArguments;
    }
  >(actionType, async (args, { extra, getState }) => {
    const { params, ...rest } = args || ({} as any);

    const { data, status, message, error } = mockData
      ? await new Promise<IResponse<R>>(resolve =>
          setTimeout(() => {
            resolve({
              data: mockData(params),
              status: 200,
            });
          }, 1000),
        )
      : await baseFetch<R, QP>(
          typeof url === "function" ? url({ params, ...rest } as any) : url,
          params || {},
          method,
          headers,
        );

    if (status >= 400 || data === null || error) {
      throw new Error((data as any)?.message || message || status.toString());
    } else {
      const transformedResult = transformData
        ? transformData(data, getState)
        : data;

      return {
        data: transformedResult,
        message,
        status,
        extraArguments: extra,
      };
    }
  });
