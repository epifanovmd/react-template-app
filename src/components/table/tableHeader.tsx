import React, { FC } from "react";
import { ITableProps } from "./table";

import cn from "classnames";
import styles from "./styles.module.scss";

export const TableHeader: FC<ITableProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <div className={cn(styles.header, className)} {...rest}>
      {children}
    </div>
  );
};
