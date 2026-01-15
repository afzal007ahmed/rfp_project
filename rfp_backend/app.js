const { vendorRouter } = require("./routes/vendor");

const cors = require("cors");
const express = require('express') ;
const { templateRouter } = require("./routes/template");
const { historyRouter } = require("./routes/history");
const { replyRouter } = require("./routes/reply");
const app = express() ;

app.use( express.json() ) ;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods : ["GET" , "POST" , "PUT" , "DELETE" , "PATCH"]
  })
);
app.use("/vendors", vendorRouter);
app.use("/template" , templateRouter );
app.use("/history" , historyRouter ) ;
app.use("/reply" , replyRouter)

module.exports = { app };
