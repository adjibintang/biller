const Models = require("../database/models");
const jwt = require("jsonwebtoken");

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
    console.log(error);
    return null;
  }
};
