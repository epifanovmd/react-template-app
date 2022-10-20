import { apiService } from "../../api";
import { IUserResponse, IUsersService } from "./Users.types";

@IUsersService()
export class UsersService implements IUsersService {
  getUsers() {
    return apiService.get<IUserResponse>("users");
  }
}
