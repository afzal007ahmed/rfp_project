const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize.config");
const { vendorsModel } = require("./vendors");
const { rfpsModel } = require("./rfps");
const { rfp_vendorsModel } = require("./rfp_vendors");



const vendors = vendorsModel( sequelize , DataTypes ) ;
const rfp = rfpsModel( sequelize , DataTypes ) ;
const rfp_vendors =  rfp_vendorsModel( sequelize , DataTypes ) ;

vendors.hasMany( rfp_vendors , { foreignKey : "vendor_id" }  ) ;
rfp.hasMany( rfp_vendors , {foreignKey : "rfp_id"}) ;
rfp_vendors.belongsTo( vendors , { foreignKey : "vendor_id"}) ;
rfp_vendors.belongsTo( rfp , { foreignKey : "rfp_id"}) ;


module.exports = { vendors , rfp , rfp_vendors } ;