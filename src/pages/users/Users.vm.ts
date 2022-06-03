import { makeAutoObservable } from "mobx";
import { CollectionHolder, getPageInitialData } from "../../common";
import { IUser, IUserResponse } from "./Users.types";
import { usersService } from "./Users.service";
import { IProvider } from "./NameProvider";
import { iocDecorator } from "../../ioc";

export const IUsersVM = iocDecorator<IUsersVM>();

export interface IUsersVM {
  readonly loading: boolean;
  readonly list: IUser[];
  readonly error: any;
  readonly name: any;

  onRefresh(): Promise<IUserResponse>;

  onSearch(search: string): void;
}

@IUsersVM()
class UsersVM implements IUsersVM {
  private holder: CollectionHolder<IUser> = new CollectionHolder(
    getPageInitialData("users") || [],
  );
  private search: string = "";

  constructor(@IProvider() public nameProvider?: IProvider) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get error() {
    return this.holder.error;
  }

  get name() {
    return this.nameProvider?.provide();
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
