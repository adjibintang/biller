const firebase = require("../middleware/firebaseMiddleware");

exports.uploadFile = async (imageFile) => {
  try {
    const fileName = new Date().getTime();

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
