import { EventNames, eventRegister } from "./eventRegister";
import { IModalProps } from "Components/popup/popup";
import React from "react";
import { message, Modal, notification } from "antd";

export const popup = {
  message: {
    info: message.info,
    success: message.success,
    error: message.error,
    warn: message.warn,
    warning: message.warning,
    loading: message.loading,
    open: message.open,
    config: message.config,
    destroy: message.destroy,
  },
  notification: {
    info: notification.info,
    success: notification.success,
    error: notification.error,
    warn: notification.warn,
    warning: notification.warning,
    open: notification.open,
    close: notification.close,
    config: notification.config,
    destroy: notification.destroy,
  },
  confitm: Modal.confirm,
  info: Modal.info,
  success: Modal.success,
  error: Modal.error,
  warn: Modal.warn,
  warning: Modal.warning,
  confirm: Modal.confirm,
  destroyAll: Modal.destroyAll,

  modal({
    title,
    render,
    params,
  }: {
    title: string;
    render: (onOk: () => void, onClose: () => void) => JSX.Element | string;
    params?: Omit<Partial<IModalProps>, "title" | "render">;
  }) {
    eventRegister.emitEvent(EventNames.modal, {
      ...params,
      title,
      render,
    } as IModalProps);
  },
};
