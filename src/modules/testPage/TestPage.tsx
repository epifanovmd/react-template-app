import React, {FC} from "react";
import {Rangew} from "../../components/controls/range/range";
import {Table} from "../../components/table/table";
import {TableHeader} from "../../components/table/tableHeader";
import {TableRow} from "../../components/table/tableRow";
import {TableRowCell} from "../../components/table/tableRowCell";

export const TestPage: FC = (): JSX.Element => {
  const thumb = (value: number) => `${value}`;

  return (
    <div className="container">
      <Rangew
        multiply={true}
        thumbText={thumb}
        rightThumbText={thumb}
        maxValue={10000}
      />
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
          <TableRowCell className="cell-3">1</TableRowCell>
          <TableRowCell>4</TableRowCell>
          <TableRowCell>5</TableRowCell>
        </TableRow>

        <TableRow>
          <TableRowCell>1</TableRowCell>
          <TableRowCell>2</TableRowCell>
          <TableRowCell>3</TableRowCell>
          <TableRowCell className="cell-2">
            <TableRow>
              <TableRowCell>подстр 1</TableRowCell>
              <TableRowCell>подстр 2</TableRowCell>
            </TableRow>
            <TableRow>
              <TableRowCell className="cell-2">подстр 1</TableRowCell>
            </TableRow>
          </TableRowCell>
        </TableRow>
      </Table>
    </div>
  );
};
