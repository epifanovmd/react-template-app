import {SimpleThunk} from "../../common/simpleThunk";
import {UsersActions} from "./usersActions";
import {requestRepository} from "../../api/RequestsRepository.g";
import {EventNames, eventRegister} from "../../common/eventRegister";
import {getExceptionText} from "../../common/exceptionType";
import {INotificationPopupData} from "../../components/popupNotification/popupNotification";
import {IUsers} from "../../api/dto/Users.g";
import {Dispatch} from "react";
import {Action} from "redux";

export class UsersThunk {
  static getUsers(callback?: (users: IUsers[]) => void): SimpleThunk {
    return async (dispatch: Dispatch<Action>): Promise<void> => {
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
