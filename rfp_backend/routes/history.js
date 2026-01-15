const { historyController } = require("../controller/history");

const historyRouter = require("express").Router() ;

historyRouter.get("/" , historyController.getHistoryAll ) ;
historyRouter.get("/:id" , historyController.getHistory)



module.exports = { historyRouter } ;