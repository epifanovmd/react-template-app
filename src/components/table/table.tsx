import React, { FC } from "react";
import styled from "styled-components";

export interface ITableProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Table: FC<ITableProps> = props => {
  const { children, ...rest } = props;

  return <TableWrap {...rest}>{children}</TableWrap>;
};

const TableWrap = styled.div`
  margin: 0 auto;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  font-size: 14px;
  line-height: 1.5;
`;
