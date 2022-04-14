import debounce from "lodash/debounce";
import { action, computed, observable } from "mobx";

export enum ListCollectionLoadState {
  initializing = "initializing",
  ready = "ready",
  loading = "loading",
  refreshing = "refreshing",
  pullToRefreshing = "pullToRefreshing",
  loadingMore = "loadingMore",
  error = "error",
}

interface IDataHolderError {
  type?: string;
  code?: string;
  msg: string;
}

type Collection<T> = T[];
// eslint-disable-next-line symbol-description
const ITEM_KEY = Symbol();

type KeyExtractor<T> = (item: T) => string;

interface IListEvents {
  performPullToRefresh(): void;
  performLoadMore(): void;
  performRefresh(): void;
  performReload(): void;
  performChangeVisibleRange(index: number, count: number): void;
}

interface Range {
  index: number;
  count: number;
}

interface Page {
  offset: number;
  pageSize: number;
}

export interface RefreshArgs {
  visibleRange: Range;
  page?: Page;
}

interface IOptions<T> {
  keyExtractor: KeyExtractor<T>;
  onFetchData: (args?: RefreshArgs) => Promise<any>;
  changeVisibleRangeDebounceWait?: number;
  loadMoreThreshold?: number;
  pageSize?: number;
}

interface IUpdateOptions {
  replace?: boolean;
}

const optsDefault = {
  changeVisibleRangeDebounceWait: 200,
  loadMoreThreshold: 0.05,
};

export class ListCollectionHolder<T> implements IListEvents {
  public error?: IDataHolderError;
  @observable.ref public d: Collection<T> = [];
  @observable private _state: ListCollectionLoadState =
    ListCollectionLoadState.initializing;
  @observable private _isEndReached: boolean = false;
  @observable.ref private _visibleRange: Range = { index: 0, count: 0 };
  @observable.ref private _opts!: IOptions<T>;
  @observable.ref private _lastRefreshArgs?: RefreshArgs;

  public initialize(opts: IOptions<T>): void {
    this._opts = {
      ...optsDefault,
      ...opts,
    };

    this.performChangeVisibleRange = debounce(
      this.performChangeVisibleRange,
      this._opts.changeVisibleRangeDebounceWait,
    );
    this._setState(ListCollectionLoadState.ready);
  }

  /**
   * Поместить данные в холдер. В зависимости от текущего состояния выполняется
   * или замена или слияние существующих данных. Слияние данных выполняется по ключу,
   * который возвращает keyExtractor.
   * @param data
   * @param opts
   */
  @action
  public updateData(data: Collection<T>, opts?: IUpdateOptions) {
    let merge = false;

    switch (this._state) {
      case ListCollectionLoadState.refreshing:
      case ListCollectionLoadState.loadingMore:
      case ListCollectionLoadState.ready:
        merge = true;
        break;
      case ListCollectionLoadState.loading:
      case ListCollectionLoadState.pullToRefreshing:
      default:
        merge = false;
        break;
    }

    if (opts && opts.replace) {
      merge = false;
    }

    this.d = !merge ? data : this._mergeData(this.d, data);

    this._isEndReached =
      this._lastPageSize > 0 && data.length < this._lastPageSize;
    this._setState(ListCollectionLoadState.ready);

    return this;
  }

  @action
  public clear() {
    this.d = [];
    this.error = undefined;
    this._isEndReached = false;
    this._lastRefreshArgs = undefined;
    this._visibleRange = { index: 0, count: 0 };
    this._setState(ListCollectionLoadState.ready);
  }

  @action
  public setError(error: IDataHolderError) {
    this.d = [];
    this.error = error;
    this._setState(ListCollectionLoadState.error);

    return this;
  }

  /* loading */

  @action
  public setLoading() {
    this.d = [];
    this._setState(ListCollectionLoadState.loading);

    return this;
  }

  @computed
  public get isLoadingAllowed(): boolean {
    return (
      this._state === ListCollectionLoadState.ready ||
      this._state === ListCollectionLoadState.error
    );
  }

  @computed
  public get isLoading() {
    return this._state === ListCollectionLoadState.loading;
  }

  /* refreshing */

  public setRefreshing() {
    this._setState(ListCollectionLoadState.refreshing);

    return this;
  }

  /* PullToRefresh */

  @action
  public setPullToRefreshing() {
    this._isEndReached = false;
    this._setState(ListCollectionLoadState.pullToRefreshing);

    return this;
  }

  @computed
  public get isPullToRefreshAllowed(): boolean {
    return (
      this._state === ListCollectionLoadState.ready ||
      this._state === ListCollectionLoadState.error
    );
  }

  @computed
  public get isPullToRefreshing() {
    return this._state === ListCollectionLoadState.pullToRefreshing;
  }

  /* loadingMore */

  public setLoadingMore() {
    this._setState(ListCollectionLoadState.loadingMore);

    return this;
  }

  @computed
  public get isLoadingMoreAllowed(): boolean {
    return (
      (this._state === ListCollectionLoadState.ready ||
        this._state === ListCollectionLoadState.error) &&
      !this._isEndReached
    );
  }

  @computed
  public get isLoadingMore() {
    return this._state === ListCollectionLoadState.loadingMore;
  }

  /* Ready */

  @computed
  public get isReady() {
    return this._state === ListCollectionLoadState.ready;
  }

  @computed
  public get isError() {
    return this._state === ListCollectionLoadState.error;
  }

  @computed
  public get isEmpty() {
    return !this.d.length;
  }

  public keyExtractor = (item: T) => {
    let cachedKey = (item as any)[ITEM_KEY];

    if (!cachedKey) {
      cachedKey = this._opts.keyExtractor(item);
      (item as any)[ITEM_KEY] = cachedKey;
    }

    return cachedKey;
  };

  /**
   * Выполнить догрузку данных в конец списка.
   * Выставить флаг isLoadingMore для отображения индикатора загрузки в нижней части списка.
   */
  public performLoadMore = (): void => {
    if (this.isLoadingMoreAllowed) {
      this.setLoadingMore();
      this._raiseOnFetchData().then();
    }
  };

  /**
   * Выполнить обновление данных списка жестом Pull-to-Refresh.
   * Выставить флаг isPullToRefresh для отображения индикатора загрузки в верхней части списка.
   */
  public performPullToRefresh = (): void => {
    if (this.isPullToRefreshAllowed) {
      this.setPullToRefreshing();
      this._raiseOnFetchData().then();
    }
  };

  // tslint:disable-next-line
  @action
  public performChangeVisibleRange = (index: number, count: number): void => {
    this._visibleRange = { index, count };
    this._raiseOnFetchData().then();
  };

  /**
   * Обновить имеющиеся данные, если они есть, иначе это Reload.
   * Флаг isLoading выставляется только, если данных в коллекции нет.
   */
  public performRefresh() {
    if (this.isLoadingAllowed) {
      if (this.isEmpty) {
        this.setLoading();
      } else {
        this.setRefreshing();
      }
      this._raiseOnFetchData().then();
    }
  }

  /**
   * Выполнить полную перезагрузку данных.
   * Выставить флаг isLoading для отображения центрального индикатора загрузки.
   */
  public performReload() {
    if (this.isLoadingAllowed) {
      this.clear();
      this.setLoading();
      this._raiseOnFetchData().then();
    }
  }

  @action
  private _setState(state: ListCollectionLoadState) {
    this._state = state;
  }

  private _mergeData(
    source: Collection<T>,
    merge: Collection<T>,
  ): Collection<T> {
    if (merge.length === 0) {
      return source;
    }

    const result = [...source];

    merge.forEach(d => {
      const index = result.findIndex(
        i => this.keyExtractor(i) === this.keyExtractor(d),
      );

      if (index === -1) {
        result.push(d);
      } else {
        result[index] = d;
      }
    });

    return result;
  }

  @action
  private _raiseOnFetchData = async () => {
    this._lastRefreshArgs = this._refreshArgs;
    const args: RefreshArgs = { ...this._lastRefreshArgs };

    await this._opts.onFetchData(args);
  };

  @computed
  private get _refreshArgs(): RefreshArgs {
    // Тут можно реализовать более оптимальную логику рассчета pageSize,
    // например, добавлять pageSize только при выставленном isLoadingMore.

    const visibleRange = this._visibleRange;
    const page = this._opts.pageSize
      ? {
          offset: visibleRange.index,
          pageSize: this._opts.pageSize! + visibleRange.count,
        }
      : undefined;

    return { visibleRange: { ...visibleRange }, page };
  }

  @computed
  private get _lastPageSize(): number {
    return (this._opts.pageSize || 0) > 0 &&
      this._lastRefreshArgs &&
      this._lastRefreshArgs.page &&
      this._lastRefreshArgs.page.pageSize > 0
      ? this._lastRefreshArgs.page.pageSize
      : 0;
  }
}
