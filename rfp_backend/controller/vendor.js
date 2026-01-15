const { vendors } = require("../models/index.js");

const vendorController = {
  getVendors: async (req, res) => {
    try {
      const response = await vendors.findAll();
      res.status(200).send({
        data: response,
        error: null,
      });
    } catch (error) {
      res.status(500).send({
        data: null,
        error: error.message,
      });
    }
  },
  addVendor: async (req, res) => {
    try {
      const { name, email } = req.body;
      await vendors.create({
        name: name,
        email: email,
      });
      res.status(200).send({
        success: true,
        error: null,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        error: error.message,
      });
    }
  },
  details: async (req, res) => {
    try {
      const { email } = req.params;
      const vendor = await vendors.findOne({
        where: {
          email: email,
        },
      });
      res.status(200).send({
        data: vendor,
        error: null,
      });
    } catch (error) {
      res.status(500).send({
        data: null,
        error: error.message,
      });
    }
  },
};

module.exports = { vendorController };
