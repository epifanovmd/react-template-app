import {UsersApiRequest} from "./UsersApiRequest.g";

export class RequestsRepository {
  usersApiRequest = new UsersApiRequest(this.baseurl);

  constructor(private baseurl: string) {
  }
}

export const requestRepository = new RequestsRepository("");