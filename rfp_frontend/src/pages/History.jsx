import { Button } from "@/components/ui/button";
import { getHistory } from "@/services/getHistory";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const History = () => {
  const [rfpHistory, setRfpHistory] = useState({
    data: null,
    loading: false,
    error: null,
  });
  const nav = useNavigate() ;
  const { id } = useParams();

  async function fetchRefHistory() {
    try {
      setRfpHistory((prev) => ({ ...prev, loading: true }));
      const response = await getHistory(id);
      setRfpHistory((prev) => ({
        ...prev,
        loading: false,
        data: response,
        error: null,
      }));
    } catch (error) {
      setRfpHistory((prev) => ({
        ...prev,
        loading: false,
        data: null,
        error: error?.response?.data?.error || error.message,
      }));
    }
  }

  useEffect(() => {
    fetchRefHistory();
  }, []);

  return (
    <div className="lg:mx-auto flex-1">
        { !rfpHistory.loading && rfpHistory.data && <Button className="mt-12 font-bold" onClick={() => nav("/reply/"+ encodeURIComponent(rfpHistory.data.data.rfp.message_id) )}> See Replies</Button>}
      <p className="font-bold mt-12">Your Prompt :</p>
      {!rfpHistory.loading && rfpHistory.data && (
        <div>
          <p className="my-3 p-12 rounded-sm font-medium bg-gray-100">
            {rfpHistory.data.data.rfp.raw}{" "}
          </p>
        </div>
      )} 
        {!rfpHistory.loading && rfpHistory.data && (
          <div className="my-6">
            <p className="font-bold text-sm mb-3">This Vendor's got this RFP :</p>
            <div className="flex gap-2 overflow-auto">
              {rfpHistory.data.data.vendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="p-6 border rounded-sm bg-green-500 text-white"
                >
                  <p className="font-bold text-sm">{vendor.vendor.name}</p>
                  <p className="font-medium text-sm">{vendor.vendor.email}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      {!rfpHistory.loading && rfpHistory.data && (
        <pre className="overflow-auto mb-12 ">
          {rfpHistory.data.data.rfp.rfpBody.replace(/\\n/g, "\n").slice(1, -1)}
        </pre>
      )}
    </div>
  );
};

export default History;
