import { getAllvendors } from "@/services/getAllVendors";
import React, { useEffect, useState } from "react";
import AlertBox from "@/customComponents/AlertBox";
import { Loader2 } from "lucide-react";
import VendorList from "@/customComponents/VendorList";
import AddVendor from "@/customComponents/AddVendor";

const Vendors = () => {
  const [vendors, setVendors] = useState({
    loading: false,
    data: null,
    error: null,
  });

  async function fetchVendors() {
    try {
      setVendors((prev) => ({ ...prev, loading: true, data: null }));
      const response = await getAllvendors();
      setVendors((prev) => ({
        ...prev,
        loading: false,
        data: response,
        error: null,
      }));
    } catch (error) {
      setVendors((prev) => ({
        ...prev,
        loading: false,
        error: error.response?.data?.error || error.message,
      }));
    }
  }

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <p className="font-bold text-xl text-center">Vendor's List</p>
      <AddVendor fetchVendors={fetchVendors}/>
      {vendors.error && (
        <AlertBox
          message={vendors.error}
          title="Vendor's Page Error"
          success={false}
        />
      )}
      {vendors.loading && (
        <div className="flex-1 flex justify-center items-center">
          <Loader2 size={50} className="animate-spin" />
        </div>
      )}
      {vendors.data && !vendors.loading && <VendorList data={vendors.data.data} />}
    </div>
  );
};

export default Vendors;
