import { EventNames, eventRegister } from "./eventRegister";
import { INotificationPopupData } from "Components/popupNotification/popupNotification";

export const popup = {
  error(title: string, message: string) {
    eventRegister.emitEvent(EventNames.notification, {
      title: title,
      subtitle: message,
      iconType: "error",
    } as INotificationPopupData);
  },

  success(title: string, message: string) {
    eventRegister.emitEvent(EventNames.notification, {
      title: title,
      subtitle: message,
      iconType: "success",
    } as INotificationPopupData);
  },
};
