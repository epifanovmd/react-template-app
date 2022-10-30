import { makeAutoObservable } from "mobx";

import { IUser, IUsersService, UsersService } from "../../service";
import { CollectionHolder } from "../common";
import { iocDecorator } from "../../ioc";

export const IUsersDataStore = iocDecorator<UsersDataStore>("IUsersDataStore");

@IUsersDataStore()
export class UsersDataStore {
  public holder: CollectionHolder<IUser> = new CollectionHolder(
    IUsersDataStore.getInitialData() || [],
  );

  constructor(@IUsersService() private _usersService: UsersService) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get error() {
    return this.holder.error;
  }

  get loading() {
    return this.holder.isLoading;
  }

  get loaded() {
    return this.holder.isReady;
  }

  async onRefresh() {
    this.holder.setPullToRefreshing();
    const res = await this._usersService.getUsers();

    if (res.error) {
      this.holder.setError({ msg: res.error.toString() });
    } else if (res.data) {
      this.holder.setData(res.data);

      return res.data;
    }

    return [];
  }
}
