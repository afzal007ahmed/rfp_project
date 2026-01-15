import axios from "axios"

export async function getVendorDetails( email ) {
    const response = await axios.get(import.meta.env.VITE_BASE_URL + "vendors/details/" + email ) ;
    return response.data ; 
}