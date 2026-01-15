const { model } = require("../config/gemini.config");
const { compareProposals } = require("../utils/compareProposals");
const { systemPrompt } = require("../utils/systemPrompt");

async function getBestVendorResponse( raw , normalizedReplies ) {
    const response = await model.generateContent({
        contents : [
            {
                role : "user" , 
                parts : [{
                    text : systemPrompt() + compareProposals( raw , normalizedReplies ) 
                }]
            }
        ]
    });
    const data = response.response.text() ;
    const cleaned = data
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

    return JSON.parse( cleaned.replace(/\\n/g , "\n")) ;
}

module.exports = { getBestVendorResponse } ;