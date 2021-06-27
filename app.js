require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const server = express();
const port = process.env.PORT || 3000;

const electricityRoutes = require("./routes/electicityRoutes");
const landlineRoutes = require("./routes/landlineRoutes");

server.use(logger("dev"));
server.use(cors());
server.use(express.json());
server.use(
  express.urlencoded({
    extended: false,
  })
);

server.use("/api/biller", electricityRoutes, landlineRoutes);

server.get("/", (req, res) => {
  res.send({
    status_code: 200,
    status_message: "Success",
    message: "Welcome to Biller Indonesia",
  });
});

server.all("*", (req, res) => {
  res.status(404).json({
    statusText: "Not Found",
    message: "You Have Trying Reaching A Route That Doesn't Exist",
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
