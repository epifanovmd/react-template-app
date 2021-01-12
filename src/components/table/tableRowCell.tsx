import styled from "astroturf";
import React, { FC } from "react";

import { ITableProps } from "./table";

export const TableRowCell: FC<ITableProps & { label?: string }> = props => {
  const { children, label, ...rest } = props;

  return (
    <Cell {...rest}>
      <Label>{label}</Label>
      <Value>{children}</Value>
    </Cell>
  );
};

const Cell = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Label = styled.div`
  font-weight: bold;
  flex-grow: 1;
  flex-basis: 0;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: none;
`;
const Value = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
