import { LoadState } from "./loadState";

export interface IResponse<T> {
  loadState?: LoadState;
  count?: number;
  page?: number;
  limit?: number;
  data: T;
}
