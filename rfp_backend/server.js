require("dotenv").config();
const { app } = require("./app");
const { sequelize } = require("./config/sequelize.config.js");
require("./models/index.js");

async function server() {
  await sequelize.sync();
  app.listen(process.env.PORT, () => {
    console.log("Server is listening at port ", process.env.PORT);
  });
}

server() ;