import axios from "axios"

export async function getHistory( id ){
    const response = await axios.get(import.meta.env.VITE_BASE_URL + "history/" + id) ; 
    return response.data ;
}


