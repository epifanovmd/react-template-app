import React, { FC } from "react";
import styled from "styled-components";

import { ITableProps } from "./table";

export const TableRow: FC<ITableProps> = props => {
  const { children, ...rest } = props;

  return <RowWrap {...rest}>{children}</RowWrap>;
};

const RowWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  @media only screen and (max-width: 599px) {
    display: block;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    padding: 5px;
    border-radius: 3px;
    margin: 5px 0;
  }
`;
