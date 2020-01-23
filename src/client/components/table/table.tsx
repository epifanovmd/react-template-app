import React, { FC, memo } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

export interface ITableProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Table: FC<ITableProps> = memo(
  ({ children, className, ...rest }) => {
    return (
      <div className={cn(styles.table, className)} {...rest}>
        {children}
      </div>
    );
  },
);
