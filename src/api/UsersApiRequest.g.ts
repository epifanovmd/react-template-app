/*tslint:disable*/
import {BaseRequest} from "./BaseRequest";
import {IUsers} from "./dto/Users.g";
import {RequestType} from "../common/requestType";

export class UsersApiRequest extends BaseRequest {
  constructor(protected baseurl: string) {
    super(baseurl);
  }

  get(config?: Object): Promise<IUsers[]> {
    return this.fetch(
      `/api/users`,
      Object.assign({
        method : RequestType.GET
      }, config))
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
