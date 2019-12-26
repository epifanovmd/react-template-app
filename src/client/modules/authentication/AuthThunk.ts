import {SimpleThunk} from "../../common/simpleThunk";
import {requestRepository} from "../../api/RequestsRepository.g";
import {popup} from "../../common/popup";
import {Login, Registration} from "../../api/dto/Auth.g";
import {AuthActions} from "./AuthActions";
import {IUser} from "../../api/dto/Users.g";

export class AuthThunk {
  static auth(params: Login, callback?: (user?: IUser) => void): SimpleThunk {
    return async (dispatch, {}, {i18next, socket}) => {
      dispatch(AuthActions.auth.started(params));
      try {
        const result = await requestRepository.authApiRequest.auth(params);
        callback && callback(result);
        dispatch(AuthActions.auth.done({params, result}));
        socket.open();
      } catch (error) {
        popup.error(i18next.t("error"), i18next.t("auth_error"));
        dispatch(AuthActions.auth.failed({params, error}));
      }
    };
  }

  static registration(params: Registration, callback?: (token: IUser) => void): SimpleThunk {
    return async (dispatch, {}, {i18next}) => {
      dispatch(AuthActions.registration.started(params));
      try {
        const result = await requestRepository.authApiRequest.registration(params);
        callback && callback(result);
        dispatch(AuthActions.registration.done({params, result}));
      } catch (error) {
        popup.error(i18next.t("error"), i18next.t(error.error?.type));
        dispatch(AuthActions.registration.failed({params, error}));
      }
    };
  }
}
