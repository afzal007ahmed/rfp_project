import axios from "axios"

export async function addVendor( body ) {
     await axios.post(import.meta.env.VITE_BASE_URL + "vendors/add" , body ) ;
}