import React from "react";
import cn from "classnames";
import styles from "./styles";

export interface ITableProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface IState {
}

export class Table extends React.Component<ITableProps, IState> {
  render(): JSX.Element {
    const {children, className, ...rest} = this.props;

    return (
      <div className={cn(styles.table, className)} {...rest}>
        {children}
      </div>
    );
  }
}
