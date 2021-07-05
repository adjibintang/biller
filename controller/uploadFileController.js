const bank_transfers = require('../database/models/bank_transfers');
const firebase = require('../middleware/firebase');

exports.uploadFile = async (req, res) => {
  try {
    const fileName = new Date().getTime();
    let imageURL =
      "https://storage.googleapis.com/tes-biller.appspot.com/" + fileName;
      if (!req.file) {
      imageURL =
        res.status(400).send("Error: No files found to upload");
      } else {
        const blob = firebase.bucket.file(fileName);
        const blobWriter = blob.createWriteStream({
          metadata: {
            contentType: req.file.mimetype,
          },
        });
  
        blobWriter.on("error", (err) => {
          console.log(err);
        });
  
        blobWriter.on("finish", () => {
          // console.log(req.file);
          //   res.status(200).send("File uploaded.")
        });
  
        blobWriter.end(req.file.buffer);
        }

    const result = await bank_transfers.save({
      receipt_url: imageURL
    });

    res.send({
      status: 200,
      data: result
    });
    
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });  
  };
}
