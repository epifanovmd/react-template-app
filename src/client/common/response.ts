import {LoadState} from "./loadState";

export interface IResponse<T> {
  loadState?: LoadState;
  totalElements?: number;
  page?: number;
  pageSize?: number;
  items: T;
}
