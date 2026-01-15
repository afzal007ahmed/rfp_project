const { rfp } = require("../models");
const { getBestVendorResponse } = require("../services/bestVendorResponse");
const { getReplies } = require("../services/getReplies");

const replyController = {
  getReplies: async (req, res) => {
    try {
      const { messageId } = req.params;
      const replies = await getReplies(messageId);

      if (!replies.length) {
        return res.status(200).send({
          data: null,
          best: null,
          error: null,
        });
      }
      const repliesMap = replies.reduce((first, second) => {
        if (!first[second.from]) {
          first[second.from] = [];
        }
        first[second.from].push(second);
        return first;
      }, {});

      const data = await rfp.findOne({
        where: {
          message_id: messageId,
        },
      });
      let bestVendor = null;
      try {
        bestVendor = await getBestVendorResponse(data.rfpBody, repliesMap);
      } catch (error) {
        if (error.status === 429) {
          return res.status(200).send({
            data: repliesMap,
            best: null,
            error: null,
          });
        }
        res.status(500).send({
          data: null,
          best: null,
          error: error.message,
        });
      }

      res.status(200).send({
        data: repliesMap,
        best: bestVendor || null,
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

module.exports = { replyController };
