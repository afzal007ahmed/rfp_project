import axios from "axios"

export async function generateRfp(prompt) {
    const emailTemplate = await axios.post(import.meta.env.VITE_BASE_URL + 'template/generate' , { prompt : prompt })  ;
    return emailTemplate.data ;
}

