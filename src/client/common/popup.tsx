import {EventNames, eventRegister} from "./eventRegister";
import {INotificationPopupData} from "../components/popupNotification/popupNotification";

class Popup {
  error(title: string, message: string): void {
    eventRegister.emitEvent(EventNames.notification, {
      title: title,
      subtitle: message,
      iconType: "error",
    } as INotificationPopupData);
  }

  success(title: string, message: string): void {
    eventRegister.emitEvent(EventNames.notification, {
      title: title,
      subtitle: message,
      iconType: "success",
    } as INotificationPopupData);
  }
}

export const popup = new Popup();
