import cn from "classnames";
import React, { FC } from "react";

import styles from "./styles.module.scss";
import { ITableProps } from "./table";

export const TableRowCell: FC<ITableProps & { label?: string }> = props => {
  const { children, className, label, ...rest } = props;

  return (
    <div className={cn(styles["row-cell"], className)} {...rest}>
      <div className={cn(styles.title)}>{label}</div>
      <div className={cn(styles.value)}>{children}</div>
    </div>
  );
};
