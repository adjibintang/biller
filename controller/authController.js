const mailService = require("../service/mailService");
const userService = require("../service/userService");

const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const findUser = await userService.findUserByEmail(req.body.email);
    if (!findUser) {
      const newUser = await userService.createUser(req.body);

      const sendEmail = await mailService.sendConfirmationEmail(
        newUser.first_name,
        newUser.email
      );

      res.status(201).send({
        statusCode: 201,
        statusText: "Created",
        message: "Register Success",
      });
    } else {
      res.status(400).send({
        statusCode: 400,
        statusText: "Bad Request",
        message: "Register Failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      statusCode: 500,
      statusText: "Internal Server Error",
      message: "Register Failed",
    });
  }
};

exports.confirmUser = async (req, res) => {
  try {
    const data = await jwt.verify(
      req.params.confirmationCode,
      process.env.SECRET_ACCESS_KEY_DEV
    );
    const findUser = await userService.findUserByEmail(data.email);

    if (findUser) {
      findUser.is_verified = true;
      await findUser.save();
      res.status(200).send({ message: "Succesfully activate User." });
    } else {
      res.status(404).send({ message: "User Not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
};
