import {SimpleThunk} from "../../common/simpleThunk";
import {UsersActions} from "./usersActions";
import {Dispatch} from "react";
import {requestRepository} from "../../api/RequestsRepository.g";
import {EventNames, eventRegister} from "../../common/eventRegister";
import {getExceptionText} from "../../common/exceptionType";
import {INotificationPopupData} from "../../components/popupNotification/popupNotification";
import {ICallback} from "../../common/ICallback";
import {IUsers} from "../../api/dto/Users.g";

export class UsersThunk {
  static getUsers(callback?: ICallback<IUsers[], void>): SimpleThunk {
    return async (dispatch: Dispatch<any>): Promise<void> => {
      const params = {};
      dispatch(UsersActions.getUsers.started(params));
      try {
        const result = await requestRepository.usersApiRequest.get();
        callback && callback(result);

        return dispatch(UsersActions.getUsers.done({params, result}));
      } catch (error) {
        eventRegister.emitEvent(EventNames.notification, {
          title: "Ошибка",
          subtitle: getExceptionText(error.type),
          iconType: "error",
        } as INotificationPopupData);

        return dispatch(UsersActions.getUsers.failed({params, error}));
      }
    };
  }
}
