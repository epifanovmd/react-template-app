import cn from "classnames";
import React, { FC } from "react";

import styles from "./styles.module.scss";

export interface ITableProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Table: FC<ITableProps> = props => {
  const { children, className, ...rest } = props;

  return (
    <div className={cn(styles.table, className)} {...rest}>
      {children}
    </div>
  );
};
