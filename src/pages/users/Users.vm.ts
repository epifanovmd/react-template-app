import { makeAutoObservable } from "mobx";
import { CollectionHolder, DataHolder, getPageInitialData } from "../../common";
import { IUser } from "./Users.types";
import { usersService } from "./Users.service";

class UsersVM {
  private holder: CollectionHolder<IUser> = new CollectionHolder(
    getPageInitialData("users") || [],
  );
  private search: string = "";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get list() {
    return (this.holder.d || []).filter(
      item =>
        item.name.includes(this.search || "") ||
        item.email.includes(this.search || "") ||
        item.website.includes(this.search || "") ||
        item.username.includes(this.search || "") ||
        item.phone.includes(this.search || ""),
    );
  }

  get loading() {
    return this.holder.isLoading;
  }

  get loaded() {
    return this.holder.isReady;
  }

  onSearch(search: string) {
    this.search = search;
  }

  async onRefresh() {
    this.holder.setPullToRefreshing();
    const res = await usersService.getUsers();

    if (res.error) {
      this.holder.setError({ msg: res.error.toString() });
    } else if (res.data) {
      this.holder.setData(res.data);

      return res.data;
    }

    return [];
  }
}

export const usersVM = new UsersVM();
