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
    
    let bank_transfers_details = await bank_transfers.findOne({
      where: {transaction_payment_id: req.body.payment_transaction_id}
    });

    if(!bank_transfers_details){
      res.status(400).json({
        statusText: "Bad Request",
        message: "Failed",
      });
    }

    bank_transfers_details = bank_transfers_details.dataValues;
    bank_transfers_details.receipt_url = imageURL;
    const updateBankTransfer = await bank_transfers.update(bank_transfers_details,
      {where: {transaction_payment_id: req.body.payment_transaction_id} });

    res.status(200).json({
      statusText: "OK",
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });  
  };
}
