import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseFetch, IResponse } from "Api/baseFetch";
import { RequestType } from "Common/requestType";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { IAppState } from "../IAppState";
import { IExtraArguments } from "../store";

type TSuccessCallback<R> = (params: {
  getState: () => IAppState;
  result: IResponse<R>;
  extraArguments: IExtraArguments;
}) => void;

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
  onSuccess?: TSuccessCallback<R>;
  onFail?: (params: {
    error?: Error;
    getState: () => IAppState;
    extraArguments: IExtraArguments;
  }) => void;
}

type TCalcType<QP, P> = QP extends void
  ? void & (P extends void ? void : { args: P })
  : { params: QP } & (P extends void ? void : { args: P });

export const callApiToolkit = <R, QP = void, P = void>({
  url,
  method,
  headers,
  actionType,
  onSuccess: _onSuccess,
  onFail,
}: IFetchParams<R, QP, P>) =>
  createAsyncThunk<
    IResponse<R>,
    TCalcType<QP, P> extends void
      ? { onSuccess: TSuccessCallback<R> } | void
      : { onSuccess?: TSuccessCallback<R> } & TCalcType<QP, P>,
    {
      dispatch: ThunkDispatch<IAppState, IExtraArguments, Action>;
      state: IAppState;
      extra: IExtraArguments;
    }
  >(actionType, async (args, { extra, getState }) => {
    const { onSuccess, params, ...rest } = args || ({} as any);
    const { data, status, message, error } = await baseFetch<R, QP>(
      typeof url === "function" ? url({ params, ...rest } as any) : url,
      params || {},
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
      const payload = {
        getState,
        result: { data, message, status },
        extraArguments: extra,
      };

      onSuccess && onSuccess(payload);
      _onSuccess && _onSuccess(payload);

      return { data, message, status };
    }
  });
