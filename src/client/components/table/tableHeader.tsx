import React from "react";
import {ITableProps} from "./table";

import cn from "classnames";
import styles from "./styles.scss";

interface IState {
}

export class TableHeader extends React.Component<ITableProps, IState> {
  render() {
    const { children, className, ...rest } = this.props;

    return (
      <div className={cn(styles.header, className)} {...rest}>
        {children}
      </div>
    );
  }
}
