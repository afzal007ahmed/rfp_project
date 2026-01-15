
const { rfpPrompt } = require("../utils/promptTemplate");
const { model } = require("../config/gemini.config");

async function generateRFP(prompt) {
  const response = await model.generateContent(rfpPrompt(prompt))
  const body = response.response.text();
  const cleaned = body
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
  return JSON.parse(cleaned);
}

module.exports = { generateRFP };
