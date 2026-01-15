import axios from "axios";

export async function sendMail(body , vendorIds , subject , prompt ) {
   const response = await axios.post(import.meta.env.VITE_BASE_URL+'template/send' , {
    body : body ,
    vendorIds : vendorIds, 
    subject : subject ,
    prompt : prompt
   });
   return response.data ;
}


