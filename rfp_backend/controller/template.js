const { Op } = require("sequelize");
const { vendors, rfp_vendors, rfp } = require("../models");
const { generateRFP } = require("../services/generateRFP");
const { sendMail } = require("../services/sendMail");
const { rfpEmailTemplate } = require("../utils/emailTemplate");

const templateController = {
  generateTemplate: async (req, res) => {
    try {
      const { prompt } = req.body;
      const jsonBody = await generateRFP(prompt);
      const emailTemplate = rfpEmailTemplate(jsonBody);
      res.status(200).send({
        data: emailTemplate,
        error: null,
      });
    } catch (err) {
      res.status(500).send({
        data: null,
        error: err.message,
      });
    }
  },
  sendMailtoVendors: async (req, res) => {
    try {
      const { subject, body, vendorIds, prompt } = req.body;
      let vendorEmails = await vendors.findAll({
        where: {
          id: {
            [Op.in]: vendorIds,
          },
        },
        attributes: ["email"],
      });
      vendorEmails = vendorEmails.map((item) => item.email);
      const info = await sendMail(vendorEmails, subject, body);
      const response = await rfp.create({
        raw: prompt,
        rfpBody: JSON.stringify(`
Subject : ${subject}\n\n${body}`),
        message_id: info.messageId,
      });

      for (let i of vendorIds) {
        await rfp_vendors.create({
          rfp_id: response.id,
          vendor_id: i,
        });
      }
      res.status(200).send({
        id: response.id,
        error: null,
      });
    } catch (error) {
      res.status(500).send({
        id: null,
        error: error.message,
      });
    }
  },
};

module.exports = { templateController };
