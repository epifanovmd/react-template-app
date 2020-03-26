import { Modal } from "antd";
import { ModalProps } from "antd/es/modal";
import { EventNames, eventRegister } from "Common/eventRegister";
import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

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
  }>({ modals: [] });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    listenerId = eventRegister.addEventListener(
      EventNames.modal,
      (data: IModalProps) => {
        setState(_state => ({
          modals: [
            ..._state.modals,
            {
              id: Math.random().toString(),
              isOpen: true,
              ...data,
            },
          ],
        }));
      },
    );

    return () => {
      eventRegister.removeEventListener(listenerId);
    };
  }, [eventRegister, state, setState]);

  const { modals } = state;

  const closeModalById = useCallback(
    (id: string) => {
      setState({
        ...state,
        modals: modals.map(item =>
          item.id === id
            ? {
                ...item,
                isOpen: false,
              }
            : item,
        ),
      });
    },
    [setState, modals, state],
  );

  const onClose = useCallback(
    (id, onFailure) => () => {
      onFailure && onFailure();
      closeModalById(id);
    },
    [closeModalById],
  );

  const onOk = useCallback(
    (id, onSuccess) => () => {
      onSuccess && onSuccess();
      closeModalById(id);
    },
    [closeModalById],
  );

  useEffect(() => {
    const timoutId = setTimeout(() => {
      setState({
        ...state,
        modals: modals.filter(item => item.isOpen),
      });
    }, 300);

    return () => clearTimeout(timoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useMemo(() => state.modals.some(item => !item.isOpen), [state.modals])]);

  return (
    <div>
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
    </div>
  );
});
