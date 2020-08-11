import "./transition.scss";

import { EventNames, eventRegister } from "Common/eventRegister";
import { useModal } from "Common/hooks/useModal";
import { useOutsideClick } from "Common/hooks/useOutsideClick";
import React, { FC, memo, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionClassNames } from "react-transition-group/CSSTransition";
import {
  EndHandler,
  EnterHandler,
  ExitHandler,
  TransitionChildren,
} from "react-transition-group/Transition";
import styled from "styled-components";

export interface ICssTransitionProps<
  RefElement extends undefined | HTMLElement = undefined
> {
  classNames?: string | CSSTransitionClassNames;
  timeout?: number | { appear?: number; enter?: number; exit?: number };
  addEndListener?: EndHandler<RefElement>;
  onEnter?: EnterHandler<RefElement>;
  onEntering?: EnterHandler<RefElement>;
  onEntered?: EnterHandler<RefElement>;
  onExit?: ExitHandler<RefElement>;
  onExiting?: ExitHandler<RefElement>;
  onExited?: ExitHandler<RefElement>;
  children?: TransitionChildren;
  nodeRef?: React.Ref<RefElement>;
}

interface IModalProps extends ICssTransitionProps {
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

export const Modal: FC<IModalProps> = memo(
  ({ name, disablePortal, children, timeout, open, onClose, ...rest }) => {
    let listenerId: string;
    const modalRef = useRef<any>();
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

    const ref = useOutsideClick(event => {
      if (modalRef.current === event.target) {
        onCloseModal();
        onClose && onClose();
      }
    });

    const modal = (
      <CSSTransition
        {...rest}
        classNames="modal"
        in={openModal}
        timeout={timeout || 300}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <StyledModal ref={modalRef}>
          <Content ref={ref}>{children}</Content>
        </StyledModal>
      </CSSTransition>
    );

    return disablePortal
      ? modal
      : ReactDOM.createPortal(modal, document.getElementById("root")!);
  },
);

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  min-width: 300px;
  min-height: 250px;
  padding: 25px;
  background: white;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
`;
