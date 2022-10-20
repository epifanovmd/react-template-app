import { makeAutoObservable } from "mobx";
import { IProvider } from "./NameProvider";
import { IUsersVM } from "./Users.types";
import { IUsersDataStore } from "../../store";

@IUsersVM()
class UsersVM implements IUsersVM {
  private search: string = "";

  constructor(
    @IProvider() public nameProvider: IProvider,
    @IUsersDataStore() private _usersDataStore: IUsersDataStore,
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get error() {
    return this._usersDataStore.error;
  }

  get name() {
    return this.nameProvider?.provide();
  }

  get list() {
    return (this._usersDataStore.holder.d || []).filter(
      item =>
        item.name.includes(this.search || "") ||
        item.email.includes(this.search || "") ||
        item.website.includes(this.search || "") ||
        item.username.includes(this.search || "") ||
        item.phone.includes(this.search || ""),
    );
  }

  get loading() {
    return this._usersDataStore.loading;
  }

  get loaded() {
    return this._usersDataStore.loaded;
  }

  onSearch(search: string) {
    this.search = search;
  }

  onRefresh() {
    return this._usersDataStore.onRefresh({});
  }
}
