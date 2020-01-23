/*tslint:disable*/
import { BaseRequest } from "./BaseRequest";
import { IUser } from "./dto/Users.g";
import { RequestType } from "../common/requestType";
import { Login, Registration } from "./dto/Auth.g";
import { BasePageResult } from "./dto/BasePageResult";

export class AuthApiRequest extends BaseRequest {
  constructor(protected baseurl: string) {
    super(baseurl);
  }

  auth(auth: Login, config?: Object): Promise<IUser> {
    return this.fetch(
      `/api/auth/login`,
      Object.assign(
        {
          method: RequestType.POST,
          body: JSON.stringify(auth),
        },
        config,
      ),
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }

  registration(body: Registration, config?: Object): Promise<IUser> {
    return this.fetch(
      `/api/auth/registration`,
      Object.assign(
        {
          body,
          method: RequestType.POST,
        },
        config,
      ),
    )
      .then((response) => response.json())
      .catch(BaseRequest.handleError);
  }
}
