import { Button } from "@/components/ui/button";
import EmailTemplateBox from "@/customComponents/EmailTemplateBox";
import VendorsListBox from "@/customComponents/VendorsListBox";
import { generateRfp } from "@/services/generateRfp";
import { sendMail } from "@/services/sendMail";
import { Loader2 } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

const GeneratedRfp = () => {
  const { prompt } = useParams();
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [selected, setSelected] = useState({});
  const decodedPrompt = decodeURIComponent(prompt);
  const [emailTemplate, setEmailTemplate] = useState({
    loading: false,
    data: null,
    error: null,
  });

  const nav = useNavigate() ;

  let disabled =
  !emailTemplate.data || subject.trim().length === 0 || 
    emailTemplate.data?.trim().length === 0 ||
    Object.keys(selected).length === 0;

  let btnDisable = useMemo(() => {
    let temp = true;
    if (Object.keys(selected)) {
      Object.keys(selected).map((key) => {
        if (selected[key]) {
          temp = false;
        }
      });
    }
    return temp;
  }, [selected]);

  btnDisable = btnDisable || disabled ;

  async function handleSubmit() {
    try {
      setLoading(true);
      const vendorIds = Object.keys(selected).filter((item) => selected[item]);
      const response = await sendMail(emailTemplate.data, vendorIds, subject , prompt);
      if( response.id ) {
        nav("/history/" + response.id ) ;
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  async function fetchGenerateRfp() {
    try {
      setEmailTemplate((prev) => ({
        ...prev,
        loading: true,
      }));
      const response = await generateRfp(decodedPrompt);
      setEmailTemplate((prev) => ({
        ...prev,
        loading: false,
        error: null,
        data: response.data,
      }));
    } catch (error) {
      setEmailTemplate((prev) => ({
        ...prev,
        loading: false,
        error: error?.response?.data?.error || error.message,
        data: null,
      }));
    }
  }

  useEffect(() => {
    fetchGenerateRfp();
  }, []);

  return (
    <div>
      <p className="text-center font-bold text-xl">Email Generated</p>
      <div className="flex gap-8 items-strech py-12">
        <EmailTemplateBox
          data={emailTemplate.data}
          loading={emailTemplate.loading}
          error={emailTemplate.error}
          setEmailTemplate={setEmailTemplate}
          subject={subject}
          setSubject={setSubject}
        />
        <VendorsListBox selected={selected} setSelected={setSelected} />
      </div>
      <Button
        className="mx-auto block font-bold cursor-pointer"
        disabled={btnDisable}
        onClick={handleSubmit}
      >
        {" "}
        {loading ? <Loader2 className="animate-spin" /> : "Send Email"}{" "}
      </Button>
    </div>
  );
};

export default GeneratedRfp;
