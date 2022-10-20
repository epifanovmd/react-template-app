import { CollectionHolder, DataHolder, ListCollectionHolder } from "./common";

export interface CollectionDataStore<Res extends Array<any>, Req = unknown> {
  holder: CollectionHolder<Res[number]>;
  error?: CollectionHolder<Res[number]>["error"];
  loading: boolean;
  loaded: boolean;
  onRefresh(req: Req): Promise<Res>;
}
export interface ListCollectionDataStore<
  Res extends Array<any>,
  Req = unknown,
> {
  holder: ListCollectionHolder<Res[number]>;
  error?: ListCollectionHolder<Res[number]>["error"];
  loading: boolean;
  loaded: boolean;
  onRefresh(req: Req): Promise<Res>;
}

export interface DataStore<Res extends Object, Req = unknown> {
  holder: DataHolder<Res>;
  error?: DataHolder<Res>["error"];
  loading: boolean;
  loaded: boolean;
  onRefresh(req: Req): Promise<Res>;
}
