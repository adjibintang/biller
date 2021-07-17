require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const server = express();
const port = process.env.PORT || 3000;

const mobileRoute = require("./routes/mobileRoute");
const authRoute = require("./routes/authenticationRoute");
const userRoute = require("./routes/userRoute");
const landlineRoutes = require("./routes/landlineRoutes");
const electricityRoutes = require("./routes/electicityRoutes");
const homeServiceRoute = require("./routes/homeserviceRoute");
const pdamRoute = require("./routes/pdamRoute");
const bpjsRoute = require("./routes/bpjsRoute");
const paymentRoute = require("./routes/paymentRoute");
const receiptRoute = require("./routes/receiptRoute");
const internetTVRoute = require("./routes/internetTVRoute");
const historyRoute = require("./routes/historyRoute");

server.use(logger("dev"));
server.use(cors());
server.use(express.json());
server.use(
  express.urlencoded({
    extended: false,
  })
);

server.get("/", (req, res) => {
  res.send("Biller App");
});

server.use("/api/biller", authRoute);
server.use("/api/biller/user", userRoute);
server.use("/api/biller/landline/bill", landlineRoutes);
server.use("/api/biller/electricity/bill", electricityRoutes);
server.use("/api/biller/home", homeServiceRoute);
server.use("/api/biller/pdam/bill", pdamRoute);
server.use("/api/biller/bpjs/bill", bpjsRoute);
server.use("/api/biller/payment", paymentRoute);
server.use("/api/biller/receipt", receiptRoute);
server.use("/api/biller/internet_TV", internetTVRoute);
server.use("/api/biller/mobile/bill", mobileRoute);
server.use("/api/biller/history", historyRoute);

server.all("*", (req, res) => {
  res.status(404).json({
    statusText: "Not Found",
    message: "You Have Trying Reaching A Route That Doesn't Exist",
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
