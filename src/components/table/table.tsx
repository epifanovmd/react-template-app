import cn from "classnames";
import React, { FC } from "react";
import styled from "styled-components";

export interface ITableProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Table: FC<ITableProps> = props => {
  const { children, ...rest } = props;

  return (
    <div className={cn(styles.table, className)} {...rest}>
      {children}
    </div>
  );
};
