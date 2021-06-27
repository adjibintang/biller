require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const server = express();
const port = process.env.PORT || 3000;

const authRoute = require("./routes/authenticationRoute");
const homeServiceRoute = require("./routes/homeserviceRoute");
const mobileOptionroute = require("./routes/mobileoptionRoute");
const packagesRoute = require("./routes/packagesroutes");
const priceList = require("./routes/pricelistRoute");

server.use(logger("dev"));
server.use(cors());
server.use(express.json());
server.use(
  express.urlencoded({
    extended: false,
  })
);

server.use("/api/biller", authRoute);
server.use("/api/biller", homeServiceRoute);
server.use("/api/biller", mobileOptionroute);
server.use("/api/biller", packagesRoute);
server.use("/api/biller", priceList);

server.all("*", (req, res) => {
  res.status(404).json({
    statusText: "Not Found",
    message: "You Have Trying Reaching A Route That Doesn't Exist",
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
