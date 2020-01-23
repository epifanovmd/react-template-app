import React, { FC, memo } from "react";
import { ITableProps } from "./table";

import cn from "classnames";
import styles from "./styles.module.scss";

export const TableRowCell: FC<ITableProps & { label?: string }> = memo(
  ({ children, className, label, ...rest }) => {
    return (
      <div className={cn(styles["row-cell"], className)} {...rest}>
        <div className={cn(styles.title)}>{label}</div>
        <div className={cn(styles.value)}>{children}</div>
      </div>
    );
  },
);
