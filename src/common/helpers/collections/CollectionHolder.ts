import { action, computed, makeAutoObservable, observable } from "mobx";
import { debounce } from "lodash";

export enum CollectionLoadState {
  ready = "ready",
  loading = "loading",
  pullToRefreshing = "pullToRefreshing",
  loadingMore = "loadingMore",
  error = "error",
}

interface Range {
  index: number;
  count: number;
}

interface IDataHolderError {
  type?: string;
  code?: string;
  msg: string;
}

interface Options {
  pageSize?: number;
}

type Collection<T> = T[];

export class CollectionHolder<T> {
  public error?: IDataHolderError;
  @observable.ref public d: Collection<T> = [];
  @observable private _visibleRange: Range = { index: 0, count: 0 };
  @observable private _state: CollectionLoadState = CollectionLoadState.ready;
  @observable private _isLoadedFirst: boolean = false;
  @observable private _lastDataLength: number = 0;
  private readonly _pageSize: number;

  constructor(opts?: Options) {
    const op = opts || {};

    this._pageSize = op.pageSize || 10000;

    this.performChangeVisibleRange = debounce(
      this.performChangeVisibleRange,
      200,
    );
    makeAutoObservable(this, {}, { autoBind: true });
  }

  @action
  public setData(data: Collection<T>) {
    switch (this._state) {
      case CollectionLoadState.loadingMore:
        this.d = [...this.d, ...data];
        break;
      case CollectionLoadState.ready:
      case CollectionLoadState.loading:
      case CollectionLoadState.pullToRefreshing:
      default:
        this.d = data;
        break;
    }

    this._lastDataLength = data.length;
    this._setState(CollectionLoadState.ready);
    if (!this._isLoadedFirst) {
      this._setIsLoadedFirst(true);
    }

    return this;
  }

  @computed
  public get isLoadedFirst() {
    return this._isLoadedFirst;
  }

  @computed
  public get offset(): number | undefined {
    return this.isLoadingMore ? this.d.length : this._visibleRange.index;
  }

  @computed
  public get pageCount(): number | undefined {
    return this._visibleRange.count || undefined;
  }

  @computed
  public get pageSize(): number {
    return this._pageSize;
  }

  public setError(error: IDataHolderError) {
    this.d = [];
    this.error = error;
    this._setState(CollectionLoadState.error);
    this._setIsLoadedFirst(false);

    return this;
  }

  /* loading */

  public setLoading() {
    this.d = [];
    this._setState(CollectionLoadState.loading);
    this._setIsLoadedFirst(false);

    return this;
  }

  public setReady() {
    this._setState(CollectionLoadState.ready);

    return this;
  }

  @computed
  public get isLoadingAllowed(): boolean {
    return (
      this._state === CollectionLoadState.ready ||
      this._state === CollectionLoadState.error
    );
  }

  @computed
  public get isLoading() {
    return this._state === CollectionLoadState.loading;
  }

  /* PullToRefresh */

  public setPullToRefreshing() {
    this._setState(CollectionLoadState.pullToRefreshing);

    return this;
  }

  @computed
  public get isPullToRefreshAllowed(): boolean {
    return (
      this._state === CollectionLoadState.ready ||
      this._state === CollectionLoadState.error
    );
  }

  @computed
  public get isPullToRefreshing() {
    return this._state === CollectionLoadState.pullToRefreshing;
  }

  /* loadingMore */

  public setLoadingMore() {
    this._setState(CollectionLoadState.loadingMore);

    return this;
  }

  @computed
  public get isLoadingMoreAllowed(): boolean {
    const isEndReached = this._lastDataLength < this._pageSize;

    return (
      (this._state === CollectionLoadState.ready ||
        this._state === CollectionLoadState.error) &&
      !isEndReached
    );
  }

  @computed
  public get isLoadingMore() {
    return this._state === CollectionLoadState.loadingMore;
  }

  /* Ready */

  @computed
  public get isReady() {
    return this._state === CollectionLoadState.ready;
  }

  @computed
  public get isError() {
    return this._state === CollectionLoadState.error;
  }

  @computed
  public get isEmpty() {
    return !this.d.length;
  }

  @action
  public performChangeVisibleRange = (index: number, count: number): void => {
    this._visibleRange.index = index;
    this._visibleRange.count = count;
  };

  @action
  private _setState(state: CollectionLoadState) {
    this._state = state;
  }

  @action
  private _setIsLoadedFirst(value: boolean) {
    this._isLoadedFirst = value;
  }
}
