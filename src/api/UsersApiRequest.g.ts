/*tslint:disable*/
import {BaseRequest} from "./BaseRequest";
import {IUsers} from "./dto/Users.g";

export class UsersApiRequest extends BaseRequest {
  constructor(protected baseurl: string) {
    super(baseurl);
  }

  get(config?: Object): Promise<IUsers[]> {
    return this.fetch(
      `/users`,
      Object.assign({
        method : "GET"
      }, config))
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
