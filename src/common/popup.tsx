import { message, Modal, notification } from "antd";
import React from "react";

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
  confirm: Modal.confirm,
  info: Modal.info,
  success: Modal.success,
  error: Modal.error,
  warn: Modal.warn,
  warning: Modal.warning,
  destroyAll: Modal.destroyAll,
};
