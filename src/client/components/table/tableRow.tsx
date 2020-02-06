import React, { FC, memo } from "react";
import { ITableProps } from "./table";

import cn from "classnames";
import styles from "./styles.module.scss";

export const TableRow: FC<ITableProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <div className={cn(styles.row, className)} {...rest}>
      {children}
    </div>
  );
};
