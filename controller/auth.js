const { Users } = require("../database/models");
const nodemailer = require("../service/mailService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.signup = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const findUser = await Users.findOne({ where: { email } });
    if (!findUser) {
      const newUser = await Users.create({
        first_name,
        last_name,
        email,
        password: bcrypt.hashSync(password, 10),
      });

      const sendEmail = await nodemailer.sendConfirmationEmail(
        newUser.first_name,
        newUser.email
      );
      const token = await jwt.sign(
        { first_name, last_name, email, isVerified: newUser.isVerified },
        process.env.SECRET_KEY
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
      process.env.SECRET_KEY
    );
    const findUser = await Users.findOne({ where: { email: data.email } });

    if (findUser) {
      findUser.is_verified = true;
      await findUser.save();

      res.status(200).send({
        message: "Succesfully activate User.",
        findUser,
      });
    } else {
      res.status(404).send({ message: "User Not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
};
