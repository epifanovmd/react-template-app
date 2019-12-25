import React, {FC, memo} from "react";
import {ITableProps} from "./table";

import cn from "classnames";
import styles from "./styles.module.scss";

export const TableHeader: FC<ITableProps> = memo(({children, className, ...rest}) => {

  return (
    <div className={cn(styles.header, className)} {...rest}>
      {children}
    </div>
  );
});
