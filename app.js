require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");

// Routes
const auth = require("./routes/auth");

const server = express();

server.use(logger("dev"));
server.use(cors());
server.use(express.json());
server.use(
  express.urlencoded({
    extended: false,
  })
);

server.use("/api/biller", auth);
server.get("/", (req, res) => {
  res.send({ message: "test" });
});

server.all("*", (req, res) => {
  res.status(404).json({
    statusText: "Not Found",
    message: "You Have Trying Reaching A Route That Doesn't Exist",
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
