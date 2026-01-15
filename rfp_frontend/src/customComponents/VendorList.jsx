import React from "react";
import List from "./List";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "../components/ui/table";
import { Inbox } from "lucide-react";

const VendorList = ({ data }) => {
  return (
    <Table className="my-12 text-center">
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/3 text-center">Id</TableHead>
          <TableHead className="w-1/3 text-center">Vendor's Name</TableHead>
          <TableHead className="w-1/3 text-center">vendor's Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((vendor) => (
          <List vendor={vendor} key={vendor.id} />
        ))}
        {!data.length && (
          <TableRow>
            <TableCell colspan={3} className="py-8 font-bold">
              <div className="flex items-center gap-2 justify-center">
                {" "}
                <Inbox size={18} />
                <p> No Vendor Listed</p>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default VendorList;
