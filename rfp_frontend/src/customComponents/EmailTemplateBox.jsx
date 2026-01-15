import React from "react";
import { Textarea } from "../components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const EmailTemplateBox = ({ data, loading, error , setEmailTemplate , subject , setSubject }) => {
  return (
    <div className="bg-gray-200 min-h-[300px] flex-1 overflow-y-scroll max-h-[700px] rounded-sm p-4 max-w-[800px]">
      {loading && (
        <div className="min-h-full flex justify-center items-center">
          <Loader2 className="animate-spin"/>
        </div>
      )}
      {error && (
        <div className="min-h-full flex justify-center items-center">
          <p>{error}</p>
        </div>
      )}
      {!loading && data && (
        <div>
          <div className="mb-3">
            <p className="text-sm mb-2 font-bold flex gap-2">
              Subject : <span className="text-red-600 font-bold">*</span>
            </p>
            <Input
              placeholder="Please enter the subject you want to send in the mail."
              className="border-black"
              value = {subject} 
              onChange = {(e) => setSubject(e.target.value)}
            />
          </div>
          <Textarea value={data} className="border-black"  onChange={( e ) => setEmailTemplate(( prev ) => ({...prev , data : e.target.value }))}/>
        </div> 
      )}
    </div>
  );
};

export default EmailTemplateBox;
