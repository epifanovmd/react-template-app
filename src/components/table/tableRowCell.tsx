import * as React from "react";
import {ITableProps} from "./table";

import cn from "classnames";
import styles from "./styles";

interface IState {
}

export class TableRowCell extends React.Component<ITableProps & { label?: string }, IState> {
  render(): JSX.Element {
    const {children, className, label, ...rest} = this.props;

    return (
      <div className={cn(styles["row-cell"], className)} {...rest}>
        <div className={cn(styles.title)}>{label}</div>
        <div className={cn(styles.value)}>{children}</div>
      </div>
    );
  }
}
