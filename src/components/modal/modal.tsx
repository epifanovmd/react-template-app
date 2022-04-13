import "./transition.scss";

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
import { useOutsideClick } from "../../common";

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
  disablePortal?: boolean;
  open?: boolean;
  onClose?: () => void;
}

export const Modal: FC<IModalProps> = memo(
  ({ disablePortal, children, timeout, open, onClose, ...rest }) => {
    let listenerId: string;
    const modalRef = useRef<any>();

    const ref = useOutsideClick(event => {
      if (modalRef.current === event.target) {
        onClose && onClose();
      }
    });

    const modal = (
      <CSSTransition
        {...rest}
        classNames="modal"
        in={open}
        timeout={timeout || 300}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <StyledModal ref={modalRef}>
          <Content ref={ref}>{children}</Content>
        </StyledModal>
      </CSSTransition>
    );

    return disablePortal || typeof document === "undefined"
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
