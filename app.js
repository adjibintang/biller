require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const server = express();
const port = process.env.PORT || 3000;

const authRoute = require("./routes/authenticationRoute");
// const internetTV = require("./routes/internetTvRoute");
// const electricityRoutes = require("./routes/electicityRoutes");
const landlineRoutes = require("./routes/landlineRoutes");
// const pdamRoute = require("./routes/pdamRoute");

server.use(logger("dev"));
server.use(cors());
server.use(express.json());
server.use(
  express.urlencoded({
    extended: false,
  })
);

server.use("/api/biller", authRoute);
// server.use("/api/biller/internet_TV", internetTV);
// server.use("/api/biller/electricity/bill", electricityRoutes);
server.use("/api/biller/landline/bill", landlineRoutes);
// server.use("/api/biller/pdam/bill", pdamRoute);

server.all("*", (req, res) => {
  res.status(404).json({
    statusText: "Not Found",
    message: "You Have Trying Reaching A Route That Doesn't Exist",
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
