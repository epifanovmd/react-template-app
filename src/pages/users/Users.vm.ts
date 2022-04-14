import { makeAutoObservable } from "mobx";
import { DataHolder, getPageInitialData } from "../../common";
import { IUser } from "./Users.types";
import { usersService } from "./Users.service";

class UsersVM {
  private holder: DataHolder<IUser[]> = new DataHolder(
    getPageInitialData("users") || [],
  );
  private search: string = "";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get list() {
    return (this.holder.data || []).filter(
      item =>
        item.name.includes(this.search || "") ||
        item.email.includes(this.search || "") ||
        item.website.includes(this.search || "") ||
        item.username.includes(this.search || "") ||
        item.phone.includes(this.search || ""),
    );
  }

  get loading() {
    return this.holder.isLoading();
  }

  get loaded() {
    return this.holder.isReady();
  }

  onSearch(search: string) {
    this.search = search;
  }

  async onRefresh() {
    this.holder.setLoading();
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
