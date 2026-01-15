import Replies from "@/customComponents/Replies";
import { getReplies } from "@/services/getReplies";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const Reply = () => {
  const { messageId } = useParams();
  const id = decodeURIComponent( messageId ) ;
  const [replies, setReplies] = useState({
    loading: false,
    data: null,
    best: null,
    error: null,
  });

  async function fetchReplies() {
    try {
      setReplies((prev) => ({
        ...prev,
        loading: true,
      }));
      const response = await getReplies(id );
      setReplies((prev) => ({
        ...prev,
        data: response.data,
        best : response.best ,
        error: null,
        loading: false,
      }));
    } catch (error) {
      setReplies((prev) => ({
        ...prev,
        data: null ,
        best : null ,
        error: error?.response?.data?.error || error.message ,
        loading: false,
      }));
    }
  }

  useEffect(() => {
     fetchReplies() ;
  } , [])


  return <div className="flex-1 h-full flex flex-col">
    <p className="text-center font-bold text-xl mb-12">Proposals</p>
    { replies.loading && <div className="flex-1 flex justify-center items-center"><Loader2 className="animate-spin" size={30}/></div>}
    { !replies.loading && replies.data && Object.keys( replies.data ).map(( key ) => <Replies reply={replies.data[ key ]} email={key} key={key} best={replies.best}/>)}
  </div>;
};

export default Reply;
