import { Modal } from "antd";
import { ModalProps } from "antd/es/modal";
import { EventNames, eventRegister } from "Common/eventRegister";
import { useModal } from "Common/hooks/useModal";
import React, { FC, memo, useCallback, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

export interface IModalProps extends ModalProps {
  name: string;
  disablePortal?: boolean;
  open?: boolean;
  onClose?: () => void;
}

export enum ModalActions {
  OPEN = "OPEN",
  CLOSE = "CLOSE",
}

export interface IModalActionParams {
  action: ModalActions;
  modalName: string;
}

export const ModalAntd: FC<IModalProps> = memo(
  ({ name, disablePortal, children, open, onClose, ...rest }) => {
    let listenerId: string;
    const [onOpenModal, onCloseModal, openModal] = useModal();

    useEffect(() => {
      if (open) {
        onOpenModal();
      } else {
        onCloseModal();
        onClose && onClose();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    useEffect(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      listenerId = eventRegister.addEventListener<IModalActionParams>(
        EventNames.modalActions,
        ({ action, modalName }) => {
          if (modalName === name) {
            console.log("action", action);
            switch (action) {
              case ModalActions.CLOSE: {
                if (open) {
                  onCloseModal();
                  onClose && onClose();
                }
                break;
              }
              case ModalActions.OPEN: {
                if (!open) {
                  onOpenModal();
                }
                break;
              }
              default: {
                break;
              }
            }
          }
        },
      );

      return () => {
        eventRegister.removeEventListener(listenerId);
      };
    }, []);

    const closeHandle = useCallback(() => {
      onCloseModal();
      onClose && onClose();
    }, [onClose, onCloseModal]);

    const modal = (
      <Modal {...rest} visible={openModal} onCancel={closeHandle}>
        {children}
      </Modal>
    );

    return disablePortal || typeof document === "undefined"
      ? modal
      : ReactDOM.createPortal(modal, document.getElementById("root")!);
  },
);
