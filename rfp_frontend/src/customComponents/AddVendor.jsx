import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import AddVendorModal from "./AddVendorModal";

const AddVendor = ({fetchVendors}) => {
    const [ open , setOpen ] = useState(false) ;
  return (
    <div>
      <AddVendorModal fetchVendors={fetchVendors} open={open} setOpen={setOpen}>
        <Button className="bg-green-600 font-bold flex items-center" onClick={() => setOpen((prev) => (!prev))}>
          <Plus className="font-bold" color="white" />
          <p>Add Vendor</p>
        </Button>
      </AddVendorModal>
    </div>
  );
};

export default AddVendor;
