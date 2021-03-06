import styled from "astroturf";
import React, { FC, useCallback } from "react";

interface IProps {
  active: boolean;
  item: any;
  value: string;
  onSetValue?: (value: any) => void;
}

export const DropdownItem: FC<IProps> = ({
  active,
  item,
  onSetValue,
  value,
}) => {
  const handleSetValue = useCallback(() => {
    onSetValue && onSetValue(item);
  }, [item, onSetValue]);

  return (
    <Wrap active={active} onClick={handleSetValue}>
      {value}
    </Wrap>
  );
};

const Wrap = styled.div<{ active?: boolean }>`
  background: #ffffff;
  &:hover {
    background: #f5f8fa90;
  }
  &.active {
    background: #f5f8fa;
  }
  padding: 10px 19px;
  font: normal normal normal 14px/32px Roboto;
  letter-spacing: 0;
  color: #222222;
  cursor: pointer;
`;
