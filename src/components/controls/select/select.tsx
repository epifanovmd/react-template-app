import { useOutsideClick } from "Common/hooks/useOutsideClick";
import { DropdownItem } from "Components/controls/select/selectItem";
import React, {
  CSSProperties,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

interface IProps<T> {
  touch?: boolean;
  error?: string;
  label?: string;
  wrapStyle?: CSSProperties;

  items: T[];

  placeholder?: string;
  name?: string;
  defaultValue?: T;
  onChange?: (value: T, name?: string) => void;
  onBlur?: (name: string) => void;
}

export const Select = <T extends string | object>({
  label,
  wrapStyle,
  error,
  touch,
  placeholder,
  defaultValue,
  onBlur,
  onChange,
  name,
  items,
}: PropsWithChildren<IProps<T>>) => {
  const [blur, setBlur] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<T>(defaultValue || ("" as any));
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

  useEffect(() => {
    if (!value && defaultValue) {
      setValue(defaultValue);
    }
    // eslint-disable-next-line
  }, [defaultValue]);

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
      setValue(value);
      setOpen(false);
      if (open && !blur) {
        onBlur && name && onBlur(name);
        setBlur(true);
      }
    },
    [open, onBlur, name, blur, onChange],
  );

  return (
    <Wrap ref={ref} style={wrapStyle}>
      {label && <Label>{label}</Label>}
      <SimpleDropdown onClick={toggleOpen}>
        {typeof value === "object"
          ? (value as any).value || (value as any).key
          : value || placeholder}
      </SimpleDropdown>
      <CSSTransition in={open} timeout={0} unmountOnExit={true}>
        <DropdownList>
          {items.map((item: any, index) => (
            <DropdownItem
              key={index}
              active={item === value}
              value={typeof item === "object" ? item.value || item.key : item}
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
