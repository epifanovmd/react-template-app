import { apiService } from "../../api";
import { IUserResponse } from "./Users.types";

export class UsersService {
  getUsers() {
    return apiService.get<IUserResponse>("users");
  }
}

export const usersService = new UsersService();
