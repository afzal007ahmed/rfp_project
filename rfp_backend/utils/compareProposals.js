function compareProposals(raw, normalizedReplies) {
  const prompt = `
ORIGINAL RFP:
"""
${raw}
"""

VENDOR EMAIL REPLIES (each reply has a messageId):
${JSON.stringify(normalizedReplies, null, 2)}

TASK (MANDATORY):
For EACH vendor:
1. Identify whether a complete proposal exists
2. Extract key offer details
3. Score response quality from 0–100
4. Assign tags
5. Identify the BEST reply messageId for that vendor

RULES:
- You MUST reference the exact messageId provided
- Do NOT invent messageIds
- If no meaningful proposal exists, bestMessageId = null
- You MUST return one result per vendor
- Output MUST be valid JSON only

RETURN FORMAT:
{
  "vendors": [
    {
      "sender": "vendor@example.com",
      "bestMessageId": "<abc123@gmail.com>",
      "summary": "",
      "qualityScore": 0,
      "tags": []
    }
  ],
  "bestVendor": {
    "sender": "vendor@example.com",
    "bestMessageId": "<abc123@gmail.com>"
  },
  "finalSummary": ""
}
`;
  return prompt;
}

module.exports = { compareProposals } ;