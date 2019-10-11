import * as React from "react";
import "./styles.scss";
import {ITableProps} from "./table";

interface IState {
}

export class TableRowCell extends React.Component<ITableProps & { label?: string }, IState> {
  render(): JSX.Element {
    const {children, className, label, ...rest} = this.props;

    return (
      <div
        className={className ? `table__row-cell ${className}` : "table__row-cell"}
        {...rest}
      >
        <div className="table__row-cell-title">{label}</div>
        <div className="table__row-cell-value">{children}</div>
      </div>
    );
  }
}
