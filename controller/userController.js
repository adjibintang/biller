const userService = require("../service/userService");
const mailService = require("../service/mailService");
const storageService = require("../service/storageService");
const jwt = require("jsonwebtoken");

exports.getToken = async (req, res) => {
  try {
    const tokenResult = await userService.generateToken(req.user.id);

    if (tokenResult === null) return res.sendStatus(500);

    return res.status(200).json({
      statusText: "Ok",
      message: "Login Success",
      token: tokenResult,
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

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

exports.update = async (req, res) => {
  try {
    const findUser = await userService.findUserByEmail(req.body.email);
    if (findUser) {
      const updateUser = await userService.updateUser(req.body);

      const sendEmail = await mailService.sendNotificationEmail(
        updateUser.first_name,
        updateUser.email
      );

      res.status(200).send({
        statusCode: 200,
        statusText: "OK",
        message: "Update Success",
      });
    } else {
      res.status(400).send({
        statusCode: 400,
        statusText: "Bad Request",
        message: "Update Failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      statusCode: 500,
      statusText: "Internal Server Error",
      message: "Update Failed",
    });
  }
};

exports.updatePhoto = async (req, res) => {
  try {
    const findUser = await userService.findUserByEmail(req.body.email);
    if (findUser) {
      const updateUser = await userService.updatePhoto(req.body.email, req.file);
    }
    res.status(200).send({
      statusCode: 200,
      statusText: "OK",
      message: "Update Success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      statusCode: 500,
      statusText: "Internal Server Error",
      message: "Update Failed",
    });
  }
}
