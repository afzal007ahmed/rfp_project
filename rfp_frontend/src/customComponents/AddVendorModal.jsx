import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addVendor } from "@/services/addVendor";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const AddVendorModal = ({ children, fetchVendors, open, setOpen }) => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const error = useRef(null);

  const disabled =
    details.email.trim().length === 0 || details.name.trim().length === 0;

  async function handleAddVendor() {
    try {
      setLoading(true);
      await addVendor(details);
      setLoading(false);
      await fetchVendors();
      setOpen( false ) ;
    } catch (err) {
      error.current = err.response?.data?.error || err.message;
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <Dialog open={open} onRequestClose={() => setOpen(false)} onOpenChange={(value) => setOpen(value) }>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Vendor Details</DialogTitle>
        <p className="text-sm font-bold">Name of Vendor : </p>
        <Input
          type="text"
          placeholder="Enter vendor's name..."
          value={details.name}
          name="name"
          onChange={handleChange}
        />
        <p className="text-sm font-bold">Email of Vendor : </p>
        <Input
          type="email"
          placeholder="Enter vendor's email..."
          value={details.email}
          name="email"
          onChange={handleChange}
        />
        {error.current && (
          <Alert>
            <AlertTitle className="font-bold">Error</AlertTitle>
            <AlertDescription className="font-bold text-red-600 text-xs my-2">
              {error.current}
            </AlertDescription>
          </Alert>
        )}
        <DialogFooter>
          <Button
            className="bg-green-600 font-bold"
            disabled={disabled}
            onClick={handleAddVendor}
          >
            {!loading ? "Add" : <Loader2 className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddVendorModal;
