import { iocDecorator } from "../../ioc";
import { ApiResponse } from "../../api";

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export type IUserResponse = IUser[];

export interface IUsersService {
  getUsers(): Promise<ApiResponse<IUserResponse>>;
}

export const IUsersService = iocDecorator<IUsersService>("IUsersService");
