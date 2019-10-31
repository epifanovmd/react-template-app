import React, {FC} from "react";
import {Table} from "../../components/table/table";
import {TableHeader} from "../../components/table/tableHeader";
import {TableRow} from "../../components/table/tableRow";
import {TableRowCell} from "../../components/table/tableRowCell";
import {DateTime} from "luxon";

import cn from "classnames";
import styles from "../../components/table/styles.scss";
import Helmet from "react-helmet";

export const TestPage: FC = () => {
  const dt = DateTime;

  return (
    <div>
      <Helmet>
        <title>Test Page</title>
      </Helmet>
      <Table>
        <TableHeader>
          <TableRow>
            <TableRowCell>1</TableRowCell>
            <TableRowCell>2</TableRowCell>
            <TableRowCell>3</TableRowCell>
            <TableRowCell>4</TableRowCell>
            <TableRowCell>5</TableRowCell>
          </TableRow>
        </TableHeader>

        <TableRow>
          <TableRowCell className={cn(styles.cell3)}>1</TableRowCell>
          <TableRowCell>4</TableRowCell>
          <TableRowCell>5</TableRowCell>
        </TableRow>

        <TableRow>
          <TableRowCell>1</TableRowCell>
          <TableRowCell>2</TableRowCell>
          <TableRowCell>3</TableRowCell>
          <TableRowCell className={cn(styles.cell2)}>
            <TableRow>
              <TableRowCell>подстр 1</TableRowCell>
              <TableRowCell>подстр 2</TableRowCell>
            </TableRow>
            <TableRow>
              <TableRowCell className={cn(styles.cell2)}>подстр 1</TableRowCell>
            </TableRow>
          </TableRowCell>
        </TableRow>
      </Table>

      <div>
        <h3>LUXON</h3>
        <div>{dt.local().toISODate()}</div>
      </div>
    </div>
  );
};
