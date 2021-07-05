const admin = require("firebase-admin");
const multer = require("multer");

// Initialize firebase admin SDK
admin.initializeApp({
  // credential: admin.credential.cert(
  //   "/home/fitra/Downloads/tutorin-e5703-firebase-adminsdk-cl0lm-6c12428d90.json"
  // ),
  credential: admin.credential.cert(
    __dirname + "/tes-biller-firebase-adminsdk-jhc84-d63373a925.json"
  ),
  storageBucket: "tes-biller.appspot.com",
});

// Cloud storage
const bucket = admin.storage().bucket();

//Upload Middleware
const upload = multer({
  storage: multer.memoryStorage(),
});

module.exports = {
  bucket,
  upload,
};