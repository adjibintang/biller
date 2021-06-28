const Models = require("../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.generateToken = async (userId) => {
  try {
    if (!process.env.SECRET_ACCESS_KEY_DEV) return null;

    const tokenResponse = await jwt.sign(
      { user: { id: userId } },
      process.env.SECRET_ACCESS_KEY_DEV,
      { expiresIn: "8h" }
    );

    return tokenResponse;
  } catch (error) {
    return null;
  }
};

exports.findUserByEmail = async (email) => {
  const user = await Models.Users.findOne({ where: { email } });
  return user;
};

exports.createUser = async (input) => {
  const { first_name, last_name, email, password } = input;
  const newUser = await Models.Users.create({
    first_name,
    last_name,
    email,
    password: bcrypt.hashSync(password, 10),
  });
  return newUser;
};
