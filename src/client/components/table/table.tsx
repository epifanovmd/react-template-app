import React from "react";
import cn from "classnames";
import styles from "./styles.scss";

export interface ITableProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface IState {
}

export class Table extends React.Component<ITableProps, IState> {
  render() {
    const {children, className, ...rest} = this.props;

    return (
      <div className={cn(styles.table, className)} {...rest}>
        {children}
      </div>
    );
  }
}
