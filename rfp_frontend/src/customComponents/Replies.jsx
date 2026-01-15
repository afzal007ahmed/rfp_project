import { getVendorDetails } from "@/services/getVendorDetials";
import React, { useEffect, useState } from "react";

const Replies = ({ reply, email, best }) => {
  const [vendorDetails, setVendorDetails] = useState({
    data: null,
    loading: false,
    error: null,
  });

  async function fetchDetails() {
    try {
      setVendorDetails((prev) => ({ ...prev, loading: true }));
      const response = await getVendorDetails(email);
      setVendorDetails((prev) => ({
        ...prev,
        loading: false,
        data: response.data,
        error: null,
      }));
    } catch (error) {
      setVendorDetails((prev) => ({
        ...prev,
        loading: false,
        data: null,
        error: error?.response?.data?.error || error.message,
      }));
    }
  }

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div>
      {!vendorDetails.loading && vendorDetails.data && (
        <div className="mb-12 border p-6 rounded-sm">
          <p className="text-sm mb-2">Vendor Details : </p>
          {best && best?.bestVendor.sender === vendorDetails.data.email && (
            <p className="text-sm p-2 bg-green-500 my-2 rounded-sm font-bold text-white w-fit">
              Best Vendor For This RFP
            </p>
          )}
          <p className="text-sm font-bold"> {vendorDetails.data.name}</p>
          <p className="text-sm font-bold"> {vendorDetails.data.email}</p>
        </div>
      )}
      {reply.map((item) => (
        <div
          key={item.messageId}
          className="p-6 border rounded-sm mb-5 bg-gray-200"
        >
          {best && best?.bestVendor.bestMessageId === item.messageId &&  <p className="font-bold text-sm bg-green-500 p-2 w-fit rounded-sm text-white mb-3">BEST PROPOSAL</p>}
          {best && best?.bestVendor.bestMessageId === item.messageId && best?.vendors.length &&  <p className="font-bold text-sm bg-green-500 p-2 w-fit rounded-sm text-white mb-3">{ best.vendors[ 0 ].summary}</p>}
          <div className="flex justify-between w-full gap-3">
            <p className="text-sm mb-6 font-medium">
              <span className="font-bold mr-2">From :</span> {item.from}
            </p>
            <p className="text-xs font-medium">{Date(item.date)}</p>
          </div>
          <pre className="overflow-auto">{item.text}</pre>
        </div>
      ))}
    </div>
  );
};

export default Replies;
