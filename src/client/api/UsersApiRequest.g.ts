/*tslint:disable*/
import {BaseRequest} from "./BaseRequest";
import {IUser} from "./dto/Users.g";
import {RequestType} from "../common/requestType";
import {BasePageResult} from "./dto/BasePageResult";

export class UsersApiRequest extends BaseRequest {
  constructor(protected baseurl: string) {
    super(baseurl);
  }

  get(config?: Object): Promise<BasePageResult<IUser[]>> {
    return this.fetch(
      `/api/users`,
      Object.assign({
        method : RequestType.GET
      }, config))
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
