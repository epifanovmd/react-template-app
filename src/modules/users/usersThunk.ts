import {SimpleThunk} from "../../common/simpleThunk";
import {UsersActions} from "./usersActions";
import {Dispatch} from "react";
import {requestRepository} from "../../api/RequestsRepository.g";
import {EventNames, eventRegister} from "../../common/eventRegister";
import {getExceptionText} from "../../common/exceptionType";
import {INotificationPopupData} from "../../components/popupNotification/popupNotification";

export class UsersThunk {
  static getUsers(): SimpleThunk {
    return async (dispatch: Dispatch<any>): Promise<void> => {
      const params = {};
      dispatch(UsersActions.getUsers.started(params));
      try {
        const result = await requestRepository.usersApiRequest.get();
        dispatch(UsersActions.getUsers.done({params, result}));
      } catch (error) {
        eventRegister.emitEvent(EventNames.notification, {
          title: "Ошибка",
          subtitle: getExceptionText(error.type),
          iconType: "error",
        } as INotificationPopupData);
        dispatch(UsersActions.getUsers.failed({params, error}));
      }
    };
  }
}