import { iocDecorator } from "../../ioc";
import { IUser, IUserResponse } from "../../service/users";

export const IUsersVM = iocDecorator<IUsersVM>("IUsersVM");

export interface IUsersVM {
  readonly loading: boolean;
  readonly list: IUser[];
  readonly error: any;
  readonly name: any;

  onRefresh(): Promise<IUserResponse>;

  onSearch(search: string): void;
}
