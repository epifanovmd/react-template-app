import {UsersApiRequest} from "./UsersApiRequest.g";
import {AuthApiRequest} from "./AuthApiRequest.g";

export class RequestsRepository {
  usersApiRequest = new UsersApiRequest(this.baseurl);
  authApiRequest = new AuthApiRequest(this.baseurl);

  constructor(private baseurl: string) {
  }
}

export const requestRepository = new RequestsRepository("");
