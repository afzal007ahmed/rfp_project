import { Checkbox } from "../components/ui/checkbox";
import { getAllvendors } from "@/services/getAllVendors";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const VendorsListBox = ({ selected, setSelected }) => {
  const [vendors, setVendors] = useState({
    loading: false,
    data: null,
    error: null,
  });

  async function fetchvendorList() {
    try {
      setVendors((prev) => ({ ...prev, loading: true }));
      const response = await getAllvendors();
      setVendors((prev) => ({
        ...prev,
        loading: false,
        data: response.data,
        error: null,
      }));
    } catch (error) {
      setVendors((prev) => ({
        ...prev,
        loading: false,
        data: null,
        error: error?.response?.data?.error || error.message,
      }));
    }
  }

  useEffect(() => {
    fetchvendorList();
  }, []);

  return (
    <div className="flex-1 max-h-[700px] overflow-y-scroll">
      <p className="font-bold">Select vendors whom you want to send :</p>
      {vendors.loading && (
        <div className="h-full flex items-center justify-center w-full">
          <Loader2 className="animate-spin" />
        </div>
      )}
      {!vendors.loading &&
        vendors.data &&
        vendors.data.map((item) => (
          <div
            className="flex items-center gap-4 p-3 border-2 my-4 rounded-sm cursor-pointer hover:bg-gray-100"
            key={item.id}
            style={{ borderColor: selected[item.id] ? "#1DB954" : "lightGrey" }}
            onClick={() =>
              setSelected((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
            }
          >
            <Checkbox
              checked={selected[item.id]}
              onCheckedChange={(value) =>
                setSelected((prev) => ({ ...prev, [item.id]: value }))
              }
              onClick={(e) => e.stopPropagation()}
            />
            <div>
              <p className="text-[13px] font-bold">{item.name}</p>
              <p className="text-sm mt-[2px]">{item.email}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default VendorsListBox;
