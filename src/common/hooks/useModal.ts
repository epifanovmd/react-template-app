import {
  IModalActionParams,
  ModalActions,
} from "Components/modal/modalTransition";
import { useCallback, useState } from "react";

import { EventNames, eventRegister } from "../eventRegister";

export type TUseModalControl = [() => void, () => void, boolean];

export const useModal = (name?: string): TUseModalControl => {
  const [open, changeOpen] = useState(false);
  const onOpen = useCallback(() => {
    if (name) {
      eventRegister.emitEvent<IModalActionParams>(EventNames.modalActions, {
        action: ModalActions.OPEN,
        modalName: name,
      });
    }
    changeOpen(true);
  }, [name]);

  const onClose = useCallback(() => {
    if (name) {
      eventRegister.emitEvent<IModalActionParams>(EventNames.modalActions, {
        action: ModalActions.CLOSE,
        modalName: name,
      });
    }
    changeOpen(false);
  }, [name]);

  return [onOpen, onClose, open];
};
