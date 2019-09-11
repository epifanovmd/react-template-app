import {EventNames, eventRegister} from "./eventRegister";
import {ExceptionType, getExceptionText} from "./exceptionType";
import {INotificationPopupData} from "../components/popupNotification/popupNotification";

class Popup {
  error(e: ExceptionType | string): void {
    eventRegister.emitEvent(EventNames.notification, {
      title: "Ошибка",
      subtitle: getExceptionText(e),
    } as INotificationPopupData);
  }

  success(title: string): void {
    eventRegister.emitEvent(EventNames.notification, {
      title: "Внимание",
      subtitle: title,
    } as INotificationPopupData);
  }
}

export const popup = new Popup();