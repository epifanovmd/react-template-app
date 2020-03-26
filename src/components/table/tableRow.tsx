import cn from "classnames";
import React, { FC } from "react";

import styles from "./styles.module.scss";
import { ITableProps } from "./table";

export const TableRow: FC<ITableProps> = props => {
  const { children, className, ...rest } = props;

  return (
    <div className={cn(styles.row, className)} {...rest}>
      {children}
    </div>
  );
};
