import { iocDecorator } from "../../ioc";
import { CollectionDataStore } from "../Store.types";
import { IUserResponse } from "../../service";

export interface IUsersDataStore extends CollectionDataStore<IUserResponse> {}

export const IUsersDataStore = iocDecorator<IUsersDataStore>("IUsersDataStore");
