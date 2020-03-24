import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
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
        setState((_state) => ({
          modals: [
            ..._state.modals,
            { id: Math.random().toString(), isOpen: true, ...data },
          ],
        }));
      },
    );

    return () => {
      eventRegister.removeEventListener(listenerId);
    };
  }, [state, setState]);

  const { modals } = state;

  const closeModalById = useCallback(
    (id: string) => {
      setState({
        ...state,
        modals: modals.map((item) =>
          item.id === id ? { ...item, isOpen: false } : item,
        ),
      });
    },
    [state.modals],
  );

  const onClose = useCallback(
    (id, onFailure) => () => {
      onFailure && onFailure();
      closeModalById(id);
    },
    [state.modals],
  );

  const onOk = useCallback(
    (id, onSuccess) => () => {
      onSuccess && onSuccess();
      closeModalById(id);
    },
    [state.modals],
  );

  useEffect(() => {
    const timoutId = setTimeout(() => {
      setState({ ...state, modals: modals.filter((item) => item.isOpen) });
    }, 300);

    return () => clearTimeout(timoutId);
  }, [
    useMemo(() => state.modals.some((item) => !item.isOpen), [state.modals]),
  ]);

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
