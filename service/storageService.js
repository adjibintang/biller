const firebase = require("../middleware/firebaseMiddleware");
const { Storage } = require('@google-cloud/storage');
const fs = require('fs')

exports.uploadFile = async (imageFile) => {
  try {
    const fileName = `${new Date().getTime()}-${imageFile.originalname}`;
    let imageURL = `https://storage.googleapis.com/${process.env.FIREBASE_STORAGE_BUCKET}/${fileName}`;

    if (!imageFile) return "Error: No files found to upload";

    const blob = await firebase.bucket.file(fileName);
    const blobWriter = await blob.createWriteStream({
      metadata: {
        contentType: imageFile.mimetype,
      },
    });

    blobWriter.on("error", (err) => {
      return err.message;
    });

    blobWriter.end(imageFile.buffer);

    return imageURL;
  } catch (error) {
    return error.message;
  }
};

exports.deleteFile = async (fileName) => {
  const bucketName = 'tes-biller.appspot.com';
  const storage = new Storage();
  try {
    const result = await storage.bucket(bucketName).file(fileName).delete();
    console.log(`gs://${bucketName}/${fileName} deleted`);

    return result; 
  } catch(e) {
    e.message =
    console.log(e.message);
  }
}
