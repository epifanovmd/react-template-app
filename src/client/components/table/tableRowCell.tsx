import React from "react";
import {ITableProps} from "./table";

import cn from "classnames";
import styles from "./styles.scss";

interface IState {
}

export class TableRowCell extends React.Component<ITableProps & { label?: string }, IState> {
  render() {
    const {children, className, label, ...rest} = this.props;

    return (
      <div className={cn(styles.rowCell, className)} {...rest}>
        <div className={cn(styles.title)}>{label}</div>
        <div className={cn(styles.value)}>{children}</div>
      </div>
    );
  }
}
