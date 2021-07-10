require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const server = express();
const port = process.env.PORT || 3000;

const mobileRoute = require("./routes/mobileRoute");
const authRoute = require("./routes/authenticationRoute");
const homeServiceRoute = require("./routes/homeserviceRoute");
const pdamRoute = require("./routes/pdamRoute");
const prepaid = require("./routes/prepaidRoute");
const newbill = require("./routes/newbillRoute");
const electricity = require("./routes/electricityRoute");

server.use(logger("dev"));
server.use(cors());
server.use(express.json());
server.use(
  express.urlencoded({
    extended: false,
  })
);

server.use("/api/biller", authRoute);
server.use("/api/biller/home", homeServiceRoute);
server.use("/api/biller/mobile", mobileRoute);
server.use("/api/biller/pdam/bill", pdamRoute);
server.use("/api/biller/bill", prepaid);
server.use("/api/biller", newbill);

server.use("/api/biller", electricity);

server.all("*", (req, res) => {
  res.status(404).json({
    statusText: "Not Found",
    message: "You Have Trying Reaching A Route That Doesn't Exist",
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
