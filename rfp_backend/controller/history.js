const { rfp, rfp_vendors, vendors } = require("../models");

const historyController = {
  getHistory: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await rfp.findOne({ where: { id: id } });
      const vendorDetails = await rfp_vendors.findAll({
        where: {
          rfp_id: id,
        },
        include: [
          {
            model: vendors,
          },
        ],
      });
      res.status(200).send({
        data: {
          rfp: response,
          vendors: vendorDetails,
        },
        error: null,
      });
    } catch (error) {
      res.status(500).send({
        data: null,
        error: error.message,
      });
    }
  },
  getHistoryAll: async (req, res) => {
    try {
      const response = await rfp_vendors.findAll({
        include: [
          { model : rfp } 
        ],
        order : [["createdAt" , "DESC"]]
      });
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
};

module.exports = { historyController };
