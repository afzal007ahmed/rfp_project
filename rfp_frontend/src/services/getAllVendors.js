import axios from "axios";

export async function getAllvendors() {
    const response = await axios.get(import.meta.env.VITE_BASE_URL + "vendors/all") ;
    return response.data ;
}

