import React from "react";
import {ITableProps} from "./table";

import cn from "classnames";
import styles from "./styles.scss";

interface IState {
}

export class TableRow extends React.Component<ITableProps, IState> {
  render() {
    const { children, className, ...rest } = this.props;

    return (
      <div className={cn(styles.row, className)} {...rest}>
        {children}
      </div>
    );
  }
}
