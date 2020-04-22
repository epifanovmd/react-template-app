import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseFetchToolkit } from "Api/baseFetchToolkit";
import { RequestType } from "Common/requestType";
import { SimpleDispatch } from "Common/simpleThunk";

import { IResponse } from "@/api";

import { IAppState } from "../IAppState";
import { IExtraArguments } from "../store";

export interface IFetchParams<R, P> {
  url:
    | ((args: P extends void ? void : { params?: Partial<P> } & P) => string)
    | string;
  method: RequestType;
  headers?: { [key: string]: string };
  actionType: string;
  onSuccess?: (params: {
    getState: () => IAppState;
    result: IResponse<R>;
    extraArguments: IExtraArguments;
  }) => void;
  onFail?: (params: {
    error?: Error;
    getState: () => IAppState;
    extraArguments: IExtraArguments;
  }) => void;
}

export const callApiToolkit = <R, P = void>({
  url,
  method,
  headers,
  actionType,
  onSuccess,
  onFail,
}: IFetchParams<R, P>) =>
  createAsyncThunk<
    IResponse<R>,
    P extends void ? void : { params?: Partial<P> } & P,
    {
      dispatch: SimpleDispatch;
      state: IAppState;
      extra: IExtraArguments;
    }
  >(actionType, async (args, { extra, getState }) => {
    const { data, status, message, error } = await baseFetchToolkit<R, P>(
      typeof url === "function" ? url(args) : url,
      (args as any)?.params || {},
      method,
      headers,
    );

    if (status >= 400 || data === null || error) {
      onFail &&
        onFail({
          error: error || new Error(message || status.toString()),
          getState,
          extraArguments: extra,
        });
      throw new Error(message || status.toString());
    } else {
      onSuccess &&
        onSuccess({
          getState,
          result: { data, message, status },
          extraArguments: extra,
        });

      return { data, message, status };
    }
  });
