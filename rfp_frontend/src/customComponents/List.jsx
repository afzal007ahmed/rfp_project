import React from "react";
import { TableRow, TableCell } from "../components/ui/table";

const List = ({ vendor }) => {
  return (
    <TableRow>
      <TableCell>{vendor.id}</TableCell>
      <TableCell>{vendor.name}</TableCell>
      <TableCell>{vendor.email}</TableCell>
    </TableRow>
  );
};

export default List;
