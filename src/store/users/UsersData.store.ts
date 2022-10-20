import { makeAutoObservable } from "mobx";
import { getPageInitialData } from "../../common";
import { IUsersDataStore } from "./UsersData.types";
import { IUser, IUsersService } from "../../service";
import { CollectionHolder } from "../common";

@IUsersDataStore()
export class UsersDataStore implements IUsersDataStore {
  public holder: CollectionHolder<IUser> = new CollectionHolder(
    getPageInitialData("users") || [],
  );

  constructor(@IUsersService() private _usersService: IUsersService) {
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
