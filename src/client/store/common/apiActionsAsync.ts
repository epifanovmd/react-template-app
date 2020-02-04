import { AsyncActionCreators } from "typescript-fsa";
import { IAppState } from "../IAppState";
import { RequestType } from "../../common/requestType";
import { SimpleThunk } from "../../common/simpleThunk";
import {baseFetch, IResponse} from "../../api";
import { IExtraArguments } from "../store";

export interface IFetchParams<P, R> {
  params: P;
  url: string;
  method: RequestType;
  headers?: { [key: string]: string };
  actions: AsyncActionCreators<P, IResponse<R>, Error>;
  onSuccess?: (
    getState: () => IAppState,
    result: IResponse<R>,
    extraArguments: IExtraArguments,
  ) => void;
  onFail?: (
    error: Error,
    getState: () => IAppState,
    extraArguments: IExtraArguments,
  ) => void;
}

export const callApi = <P, R>({
  params,
  url,
  method,
  headers,
  actions,
  onSuccess,
  onFail,
}: IFetchParams<P, R>): SimpleThunk => {
  return async (dispatch, getState, extraArguments) => {
    dispatch(actions.started(params));

    const { data, status, message } = await baseFetch<P, R>(
      url,
      params,
      method,
      headers,
    );

    if (status >= 400 || data == null) {
      const error = {
        name: status.toString(),
        message: message || status.toString(),
      };

      dispatch(actions.failed({ params, error }));
      onFail && onFail(error, getState, extraArguments);
    } else {
      dispatch(actions.done({ params, result: {data, message, status} }));
      onSuccess && onSuccess(getState, {data, message, status}, extraArguments);
    }
  };
};
