import React from "react";
import "./styles.scss";
import {ITableProps} from "./table";
interface IState {
}

export class TableRowCell extends React.Component<ITableProps, IState> {
  render(): JSX.Element {
    const { children, className, ...rest } = this.props;

    return (
      <div className={className ? `table__row-cell ${className}` : "table__row-cell"} {...rest}>
        {children}
      </div>
    );
  }
}
