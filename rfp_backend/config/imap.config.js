const imapConfig = {
  imap: {
    user: process.env.USER_EMAIL,
    password: process.env.EMAIL_PASS,
    host: "imap.gmail.com",
    port: 993,
    tls: true,
    authTimeout: 10000,
    tlsOptions: {
      rejectUnauthorized: false,
    },
  },
};

module.exports = { imapConfig };
