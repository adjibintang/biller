const bcrypt = require("bcrypt");
const Models = require("../database/models");
const jwt = require("jsonwebtoken");
const { reset } = require("nodemon");

exports.login = async (req, res, next) => {
  try {
    const user = await Models.Users.findOne({
      where: { email: req.body.email },
    });

    if (user === null) {
      return res.status(401).json({
        statusText: "Unauthorized",
        message: "Incorrect Email Or Password",
      });
    }

    await bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (!result) {
        return res.status(401).json({
          statusText: "Unauthorized",
          message: "Incorrect Email Or Password",
        });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.userAuthorization = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token === null || token === undefined) return res.sendStatus(401);
    if (!process.env.SECRET_ACCESS_KEY_DEV) return res.sendStatus(500);

    await jwt.verify(
      token,
      process.env.SECRET_ACCESS_KEY_DEV,
      async (err, data) => {
        if (err) {
          if (err.name === "JsonWebTokenError") {
            return res.status(401).json({
              message: "Unauthorized",
            });
          } else {
            return res.sendStatus(400);
          }
        }

        const userData = await Models.Users.findByPk(data.user.id);

        req.user = userData;
        next();
      }
    );
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
