function rfpEmailTemplate(data) {
  return `
Dear ${data.vendor_name || "Vendor"},

We invite you to submit a proposal for the following Request for Proposal (RFP). Please find the details below:

--------------------------------------------------

RFP Title:
${data.title ?? "Not specified"}

Summary:
${data.summary ?? "Not specified"}

Scope of Work:
${data.scope_of_work ?? "Not specified"}

Submission Deadline:
${data.deadline ?? "Not specified"}

Budget:
${data.budget ?? "Not specified"}

${ Object.keys(data.additional_info)?.length > 0 && 
`Additional Information : 
 ${ Object.keys(data.additional_info).map(( key ) => `${ key } : ${ data.additional_info[ key ]}`).join('\n')}
`}

--------------------------------------------------

Please submit your proposal on or before the stated deadline.  
If you have any questions or need clarification, feel free to contact us.

Contact Email:
${data.contact_email ?? process.env.USER_EMAIL}

We appreciate your time and look forward to your response.

Best regards,
${data.sender_name || "Procurement Team"}
${data.company_name || ""}
`;
}

module.exports = { rfpEmailTemplate };
