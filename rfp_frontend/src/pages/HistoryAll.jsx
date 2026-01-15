import HistoryList from "@/customComponents/HistoryList";
import { getHistoryAll } from "@/services/getHistoryAll";
import { Box, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const HistoryAll = () => {
  const [history, setHistory] = useState({
    data: null,
    loading: false,
    error: null,
  });

  async function fetchAllHistory() {
    try {
      setHistory((prev) => ({ ...prev, loading: true }));
      const response = await getHistoryAll();
      setHistory((prev) => ({ loading: false, data: response, error: null }));
    } catch (error) {
      setHistory((prev) => ({
        ...prev,
        loading: false,
        error: error?.response?.data?.error || error.message,
      }));
    }
  }


  useEffect(() => {
     fetchAllHistory() ;
  } , [])

  return <div className="h-full">
    <p className="font-bold text-center text-xl mb-12">Recent RFP's</p>
    { history.loading && <div className="h-full flex justify-center items-center"> <Loader2 className="animate-spin" /> </div>}
    { !history.loading && history.data && <HistoryList history={history.data}/>}
    { !history.loading && !history.data?.data?.length && <p className="flex gap-2 justify-center items-center"><Box size={20}/> <span className="text-gray-500">No History</span></p> }
  </div>;
};

export default HistoryAll;
