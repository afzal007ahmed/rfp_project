import axios from "axios";

export async function getHistoryAll() {
    const response = await axios.get(import.meta.env.VITE_BASE_URL+"history") ;
    return response. data ;
}
