const { vendorController } = require('../controller/vendor');

const vendorRouter = require('express').Router() ;


vendorRouter.get('/all' , vendorController.getVendors ) ;
vendorRouter.post('/add' , vendorController.addVendor ) ;
vendorRouter.get('/details/:email' , vendorController.details )

module.exports = { vendorRouter } ;