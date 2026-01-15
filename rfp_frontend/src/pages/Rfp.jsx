import React, { useState } from "react";
import { Textarea } from "../components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const Rfp = () => {
  const nav = useNavigate();
  const [prompt, setPrompt] = useState("");
  const disabled = prompt.trim().length === 0;
  return (
    <div className="flex flex-col justify-center h-full">
      <p className="text-center font-bold text-xl">Generate RFP</p>
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="mt-12 min-h-[200px]"
        placeholder="Enter detailed prompt. Add all the things you want to be in your RFP.

example : I need to procure laptops and monitors for our new office.Budget is $50,000 total. Need delivery within 30 days. We need 20 laptops with 16GB RAM and 15
monitors 27-inch. Payment terms should be net 30, and we need at least 1 year warranty.
        "
      />
      <div className="text-center w-full my-12">
        <Button
          className="bg-green-600 font-bold font-white"
          disabled={disabled}
          onClick={() => nav(`/generatedrfp/${encodeURIComponent(prompt)}`)}
        >
          Generate
        </Button>
      </div>
    </div>
  );
};

export default Rfp;
