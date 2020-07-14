import React, { FC } from "react";
import styled from "styled-components";

import { ITableProps } from "./table";

export const TableHeader: FC<ITableProps> = props => {
  const { children, ...rest } = props;

  return <HeaderWrap {...rest}>{children}</HeaderWrap>;
};

const HeaderWrap = styled.div`
  font-weight: bold;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  @media only screen and (max-width: 599px) {
    display: none;
  }
`;
