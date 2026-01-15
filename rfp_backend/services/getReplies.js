const imaps = require("imap-simple");
const { simpleParser } = require("mailparser");
const { imapConfig } = require("../config/imap.config");

async function getReplies(messageId) {
  const connection = await imaps.connect(imapConfig);

  await connection.openBox("INBOX");

  const searchCriteria = [["HEADER", "In-Reply-To", messageId]];

  const fetchOptions = {
    bodies: [""],
    markSeen: false,
  };

  const messages = await connection.search(searchCriteria, fetchOptions);

  const replies = [];

  for (const msg of messages) {
    const raw = msg.parts[0].body;
    const parsed = await simpleParser(raw);

    replies.push({
      from: parsed.from?.value?.[0]?.address,
      subject: parsed.subject,
      messageId: parsed.messageId,
      inReplyTo: parsed.inReplyTo,
      date: parsed.date,
      text: parsed.text,
    });
  }

  connection.end();
  return replies;
}

module.exports = { getReplies } ;