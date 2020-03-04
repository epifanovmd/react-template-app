import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { EventNames, eventRegister } from "Common/eventRegister";
import { Modal } from "antd";
import { ModalProps } from "antd/lib/modal/Modal";
import { bool, boolean } from "yup";

export interface IModalProps extends ModalProps {
  title: string;
  render: (onClose: () => void, onOk: () => void) => JSX.Element;
  onSuccess?: () => void;
  onFailure?: () => void;
}

export const Popup: FC = memo(() => {
  let listenerId: string;
  const [state, setState] = useState<{
    modals: ({ id: string; isOpen: boolean } & IModalProps)[];
  }>({
    modals: [],
  });

  useEffect(() => {
    listenerId = eventRegister.addEventListener(
      EventNames.modal,
      (data: IModalProps) => {
        setState({
          modals: [
            ...state.modals,
            { id: Math.random().toString(), isOpen: true, ...data },
          ],
        });
      },
    );

    return () => {
      eventRegister.removeEventListener(listenerId);
    };
  }, [state, setState]);

  const { modals } = state;

  const onClose = useCallback(
    (id, onFailure) => () => {
      onFailure && onFailure();
      setState({ ...state, modals: modals.filter((item) => item.id !== id) });
    },
    [state.modals],
  );

  const onOk = useCallback(
    (id, onSuccess) => () => {
      onSuccess && onSuccess();
      setState({ ...state, modals: modals.filter((item) => item.id !== id) });
    },
    [state.modals],
  );

  return (
    <>
      {modals.map(
        ({ id, title, render, isOpen, onFailure, onSuccess, ...rest }) => (
          <Modal
            {...rest}
            key={id}
            title={title}
            visible={isOpen}
            onCancel={onClose(id, onFailure)}
            onOk={onOk(id, onSuccess)}
          >
            {render(onOk(id, onSuccess), onClose(id, onFailure))}
          </Modal>
        ),
      )}
    </>
  );
});
