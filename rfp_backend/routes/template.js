const { templateController } = require("../controller/template");

const templateRouter = require("express").Router() ;

templateRouter.post("/generate" , templateController.generateTemplate ) ;
templateRouter.post("/send" , templateController.sendMailtoVendors)

module.exports = { templateRouter } ;