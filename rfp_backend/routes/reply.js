const { replyController } = require("../controller/reply");

const replyRouter = require("express").Router() ;

replyRouter.get("/all/:messageId" , replyController.getReplies ) ;

module.exports = { replyRouter } ;