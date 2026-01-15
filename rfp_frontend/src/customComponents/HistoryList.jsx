import React from "react";
import { useNavigate } from "react-router";

const HistoryList = ({ history }) => {
    const nav = useNavigate() ;
  return history.data.map((item) => {
    const date = new Date(item.createdAt);
    return (
      <div
        key={item.id}
        className="p-3 border my-2 rounded-sm hover:bg-[#343A46] hover:text-white cursor-pointer flex items-center justify-between hover:scale-[1.01] transition-bg duration-[0.5s] ease-in-out"
        onClick={() => nav("/history/"+item.rfp.id)}
      >
        <div>
          <p className="font-bold text-xs">Your Prompt :</p>
          <p className="font-medium  text-sm my-2">
            {item.rfp.raw.slice(0, 50)}...
          </p>
        </div>
        <div className="text-sm">
          <p> {date.getDay()}-{ date.getDate()}-{ date.getMonth() + 1 }-{ date.getFullYear()} </p>
        </div>
      </div>
    );
  });
};

export default HistoryList;
