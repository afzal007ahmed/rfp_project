import axios from "axios";

export async function getReplies( messageId ) {
    const response = await axios.get(import.meta.env.VITE_BASE_URL + "reply/all/" + messageId ) ;
    return response.data ; 
}
