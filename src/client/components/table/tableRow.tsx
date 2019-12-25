import React, {FC, memo} from "react";
import {ITableProps} from "./table";

import cn from "classnames";
import styles from "./styles.module.scss";

export const TableRow: FC<ITableProps> = memo(({children, className, ...rest}) => {
  return (
    <div className={cn(styles.row, className)} {...rest}>
      {children}
    </div>
  );
});
