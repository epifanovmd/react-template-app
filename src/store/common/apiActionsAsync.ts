import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { baseFetch, IResponse } from "Api/baseFetch";
import { RequestType } from "Common/requestType";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { IAppState } from "../IAppState";
import { IExtraArguments } from "../store";

export type IThunkDispatch = ThunkDispatch<IAppState, IExtraArguments, Action>;

type TSuccessCallback<R> = (params: {
  getState: () => IAppState;
  dispatch: IThunkDispatch;
  result: IResponse<R>;
  extraArguments: IExtraArguments;
}) => void;

type TConditionalTrowError<R> = (params: {
  getState: () => IAppState;
  dispatch: IThunkDispatch;
  result: IResponse<R>;
  extraArguments: IExtraArguments;
}) => void | Error;

type TFailureCallback = (params: {
  error?: Error;
  getState: () => IAppState;
  dispatch: IThunkDispatch;
  extraArguments: IExtraArguments;
}) => void;

export interface IFetchParams<R, QP, P> {
  url:
    | ((
        args: QP extends void
          ? P extends void
            ? void
            : { args: P }
          : P extends void
          ? { params: QP }
          : { params: QP } & { args: P },
      ) => string)
    | string;
  method: RequestType;
  additionalParams?: { [key in string]: string | number };
  headers?: { [key: string]: string };
  actionType: string;
  transformData?: (result: R, getState: () => IAppState) => R;
  onSuccess?: TSuccessCallback<R>;
  onFailure?: TFailureCallback;
  conditionalThrowError?: TConditionalTrowError<R>;
}

type TCalcType<QP, P> = QP extends void
  ? {} & (P extends void ? void : { args: P })
  : P extends void
  ? { params: QP }
  : { args: P } & { params: QP };

type TThunkArg<R, QP, P> = QP extends void
  ? P extends void
    ? { onSuccess?: TSuccessCallback<R>; onFailure?: TFailureCallback } | void
    : {
        onSuccess?: TSuccessCallback<R>;
        onFailure?: TFailureCallback;
      } & TCalcType<QP, P>
  : {
      onSuccess?: TSuccessCallback<R>;
      onFailure?: TFailureCallback;
    } & TCalcType<QP, P>;

interface IThunkApiConfig {
  dispatch: ThunkDispatch<IAppState, IExtraArguments, Action>;
  state: IAppState;
  extra: IExtraArguments;
}

export const callApiToolkit = <R, QP = void, P = void>({
  url,
  method,
  headers,
  actionType,
  transformData,
  additionalParams = {},
  onSuccess: _onSuccess,
  onFailure: _onFail,
  conditionalThrowError,
}: IFetchParams<R, QP, P>): AsyncThunk<
  IResponse<R>,
  TThunkArg<R, QP, P>,
  IThunkApiConfig
> =>
  createAsyncThunk<IResponse<R>, TThunkArg<R, QP, P>, IThunkApiConfig>(
    actionType,
    async (args, { extra, getState, dispatch }) => {
      const { onSuccess, onFailure, params, ...rest } = args || ({} as any);

      const newParams = { ...params, ...additionalParams };

      const { data, status, message, error } = await baseFetch<R, QP>(
        typeof url === "function"
          ? url({ params: newParams, ...rest } as any)
          : url,
        newParams || {},
        method,
        headers,
      );

      if (status >= 400 || data === null || error) {
        const failureParams = {
          error: error || new Error(message || status.toString()),
          getState,
          dispatch,
          extraArguments: extra,
        };

        _onFail && _onFail(failureParams);
        onFailure && onFailure(failureParams);

        throw error || new Error(message || status.toString());
      } else {
        const transformedResult = transformData
          ? transformData(data, getState)
          : data;
        const payload = {
          getState,
          dispatch,
          result: { data: transformedResult, message, status },
          extraArguments: extra,
        };

        conditionalThrowError && conditionalThrowError(payload);

        onSuccess && onSuccess(payload);
        _onSuccess && _onSuccess(payload);

        return { data: transformedResult, message, status };
      }
    },
  );
