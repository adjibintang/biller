const landlineService = require("../service/landlineService");

exports.getLandlineAccInfo = async (req, res) => {
  try {
    const telephoneNumber = req.body.telephone_number;
    const user_id = req.user.id

    if(!telephoneNumber) {
      res.status(400).json({
        statusText: "Bad Request",
        message: "Failed To Get Landline Account Info",
      });
    }

    const {data: accInfo, error} = await landlineService.getAccInfo(telephoneNumber, user_id);
    if(error !== null){
      res.status(202).json({
        statusText: "Accepted",
        message: error
      });
    }
    if(accInfo === null) {
      res.status(204).json({
        statusText: "No Content",
      });
    }
    res.status(200).json({
      statusText: "OK",
      message: "Success To Get Landline Account Info",
      data: accInfo
      });
    
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });
  }
};


exports.postLandlineBill = async (req, res) => {
  try {
    const user_id = req.user.id;

    if(!req.body.data.No_Telephone) {
      res.status(400).json({
        statusText: "Bad Request",
        message: "Failed to Get Electricity Account Info"
      });
    } 

    if(req.body.recurringBilling.period !== "Month" && req.body.recurringBilling.status === true){
      res.status(400).json({
        statusText: "Bad Request",
        message: "Failed to Get Electricity Account Info"
      });
    }
    let data = await landlineService.createLandlineBill(req.body, user_id);
      
    data.bankTransferDetails.Total = data.landline_bill_details.Total ;

    if(data.landline_bill_details === null || data.bankTransferDetails === null) {
      res.status(204).json({
        statusText: "No Content",
      });
    } else {
      res.status(200).json({
        statusText: "OK",
        message: "Success to Get Electricity Account Info",
        data: data
      });
    }
  } catch (error) {
    console.log("🦄 ~ file: landlineController.js ~ line 76 ~ exports.postLandlineBill= ~ error", error)
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });
  };
};

