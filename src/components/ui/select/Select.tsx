import React, {
  CSSProperties,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { useOutsideClick } from "../../../common";
import { DropdownItem } from "./SelectItem";

export interface ISelectItem {
  key: string | number;
  label: string;
  [key: string]: any;
}

interface IProps<T extends ISelectItem> {
  touch?: boolean;
  error?: string;
  label?: string;
  wrapStyle?: CSSProperties;

  items: T[];
  value?: T;
  placeholder?: string;
  name?: string;
  onChange?: (value: T, name?: string) => void;
  onBlur?: (name: string) => void;
}

export const Select = <T extends ISelectItem>({
  label,
  wrapStyle,
  error,
  touch,
  placeholder,
  onBlur,
  onChange,
  name,
  items,
  value,
}: PropsWithChildren<IProps<T>>) => {
  const [blur, setBlur] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useOutsideClick(() => {
    setOpen(false);
    if (open && !blur) {
      onBlur && name && onBlur(name);
      setBlur(true);
    }
  });

  useEffect(() => {
    if (blur) {
      onBlur && name && onBlur(name);
      setBlur(true);
    }
    // eslint-disable-next-line
  }, [blur]);

  const toggleOpen = useCallback(() => {
    setOpen(state => !state);

    if (open && !blur) {
      onBlur && name && onBlur(name);
      setBlur(true);
    }
  }, [open, onBlur, name, blur]);

  const handleSetValue = useCallback(
    (value: any) => {
      onChange && onChange(value, name);
      setOpen(false);
      if (open && !blur) {
        onBlur && name && onBlur(name);
        setBlur(true);
      }
    },
    [open, onBlur, name, blur, onChange],
  );

  const simpleValue = useMemo(
    () =>
      (typeof value === "object"
        ? (value as any).name || (value as any).label
        : value) || placeholder,
    [placeholder, value],
  );

  const getActive = useCallback(
    (item: ISelectItem) =>
      !!(
        item &&
        value &&
        item.key !== undefined &&
        item.key === (value as any).key
      ),
    [value],
  );

  const getValue = useCallback((item: ISelectItem) => item.label, []);

  return (
    <Wrap ref={ref} style={wrapStyle}>
      {label && <Label>{label}</Label>}
      <SimpleDropdown onClick={toggleOpen}>{simpleValue}</SimpleDropdown>
      <CSSTransition in={open} timeout={0} unmountOnExit={true}>
        <DropdownList>
          {items.map((item: any, index) => (
            <DropdownItem
              key={index}
              active={getActive(item)}
              value={getValue(item)}
              item={item}
              onSetValue={handleSetValue}
            />
          ))}
        </DropdownList>
      </CSSTransition>
      <Error>{touch && error}</Error>
    </Wrap>
  );
};

const Wrap = styled.div`
  min-width: 343px;
  min-height: 50px;
  border-radius: 8px;
  color: #a2a2a2;
  position: relative;
`;
const SimpleDropdown = styled.div`
  font: normal normal normal 14px/17px Roboto;
  background: #f5f8fa;
  border-radius: 8px;
  color: #a2a2a2;
  padding: 17px;
  border: none;
  width: 100%;
  height: 100%;
  cursor: pointer;
  min-height: 51px;
`;

const DropdownList = styled.div`
  position: absolute;
  margin-top: 6px;
  padding: 6px 0;
  z-index: 100;

  background: #ffffff;
  box-shadow: 0 3px 8px #00000026;
  border-radius: 8px;
  width: 100%;
  max-height: 300px;
  overflow: auto;
`;
const Error = styled.div`
  font: normal normal normal 10px/13px Roboto;
  color: #e82828;
  padding-top: 2px;
  padding-left: 17px;
  height: 21px;
`;

const Label = styled.div`
  padding-bottom: 3px;
  padding-left: 17px;
  font: normal normal normal 14px/17px Roboto;
  color: #222222;
`;
