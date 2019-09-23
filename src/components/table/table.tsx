import React from "react";
import "./styles.scss";

export interface ITableProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface IState {
}

export class Table extends React.Component<ITableProps, IState> {
  render(): JSX.Element {
    const {children, className, ...rest} = this.props;

    return (
      <div className={className ? `table ${className}` : "table"} {...rest}>
        {children}
      </div>
    );
  }
}
