const { Sequelize } = require("sequelize");

const sequelize = new Sequelize( process.env.DB_NAME , process.env.USER , process.env.PASSWORD ,  {
    host : "localhost" , 
    dialect : "postgres" 
})


module.exports = { sequelize } ;