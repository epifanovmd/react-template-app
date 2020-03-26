import cn from "classnames";
import React, { FC } from "react";

import styles from "./styles.module.scss";
import { ITableProps } from "./table";

export const TableHeader: FC<ITableProps> = props => {
  const { children, className, ...rest } = props;

  return (
    <div className={cn(styles.header, className)} {...rest}>
      {children}
    </div>
  );
};
