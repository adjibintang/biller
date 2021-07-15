const Models = require("../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const storageService = require("../service/storageService");
const {storage} = require('firebase/storage');

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
  const { first_name, last_name, email, password, pin } = input;
  const newUser = await Models.Users.create({
    first_name,
    last_name,
    email,
    password: bcrypt.hashSync(password, 10),
    pin: bcrypt.hashSync(pin, 10),
  });
  return newUser;
};

exports.updateUser = async (input) => {
  const { first_name, last_name, email, password, phone_number, pin } = input;
 
  const updateUser = await Models.Users.update({
    first_name,
    last_name,
    email,
    password: bcrypt.hashSync(password, 10),
    phone_number,
    pin: bcrypt.hashSync(pin, 10),
  },
  { where: {email} });
  return updateUser;
}

exports.updatePhoto = async (email, file) => {
  
  const uploadPhoto = await storageService.uploadFile(file);

  const updateImageUrl = await Models.Users.update(
    { image_url: uploadPhoto },
    { where: {email} }
  );
  return uploadPhoto;
}

const testDelete = async(imageName) => {
  await firebase.storage().bucket().file().delete();

}
