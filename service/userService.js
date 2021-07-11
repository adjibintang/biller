const Models = require("../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const storageService = require("../service/storageService");
const { storage, app } = require("../middleware/firebaseMiddleware");
const firebase = require("firebase");
// const admin = require("firebase-admin");
// const firebase = require('firebase/app');
// const fbstorage = require('firebase/storage');

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
  const { first_name, last_name, email, password, phone_number, pin } = input;
  const newUser = await Models.Users.create({
    first_name,
    last_name,
    email,
    password: bcrypt.hashSync(password, 10),
    phone_number,
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
    // image_url: uploadPhoto,
    pin: bcrypt.hashSync(pin, 10),
  },
  { where: {email} });
  return updateUser;
}

exports.updatePhoto = async (email, file) => {
  const url = await Models.Users.findOne({
    attributes: ["image_url"],
    where: { email } 
  });

  if(url) {
    // const tes = await deleteFile();
  }

  const uploadPhoto = await storageService.uploadFile(file);

  const updateReceiptUrl = await Models.Users.update(
    { image_url: uploadPhoto },
    { where: {email} }
  );
  return url;
}

const deleteFromFirebase = (url) => {
  var fileUrl = url;
  // Create a reference to the file to delete
  var storage = admin.storage();
  var fileRef = storage.refFromURL(fileUrl);
  
  // Delete the file using the delete() method 
  fileRef.delete().then(function () {
  
  // File deleted successfully
  console.log("File Deleted")
  }).catch(function (error) {
  // Some Error occurred
  });

  // var storage = firebase.database()
  // .ref("https://storage.googleapis.com/tes-biller.appspot.com/");
  // const storage = admin.storage()
  //1.
  // let pictureRef = storage.refFromURL(url);
 //2.
  // await pictureRef.delete();
  
};

const deleteFile = async () => {
  const storageRef = firebase.database().ref();
  let desertRef = storageRef.child("/1625939774710");
  desertRef.delete().then(() => {
    console.log("File deleted successfully");
  }).catch((error) => {
    console.log(error);
  })
}
