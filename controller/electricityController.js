const electricityService = require('../service/electricityService');

exports.getTagihanAccInfo = async (req, res) => {
  try {
    const idPel = req.body.idpel
    const user_id = req.user.id

    if(!idPel) {
      res.status(400).json({
        statusText: "Bad Request",
        message: "Failed to Get Electricity Account Info"
      });
    } 

    const {data: accInfo, error} = await electricityService.getTagihanAccInfo(idPel,user_id);
    if(error !== null){
      res.status(500).json({
        statusText: "Internal Server Error",
        message: error
      })
    }
    if(accInfo === null) {
      res.status(204).json({
        statusText: "No Content",
      });
    } else {
    res.status(200).json({
      statusText: "OK",
      message: "Success to Get Electricity Account Info",
      data: accInfo
      });
    }
  } catch (error) {
    console.log("🦄 ~ file: electricityController.js ~ line 35 ~ exports.getTagihanAccInfo= ~ error", error)
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });
  };
};

exports.getElectricityOptions = async (req, res) => {
  try {
    const serviceId = req.params.service_id;
    const options = await electricityService.getElectricityOptions(serviceId);    
    
    res.status(200).json({
      statusText: "OK",
      message: "Electricity Options",
      data: options
    });
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: "Failed to Get Electricity Options"
    });
  };
};

exports.getTokenPricelist = async (req, res) => {
  try {
    const optionId = req.body.option_id
    const pricelist = await electricityService.getTokenPricelist(optionId);

    if(pricelist !== null) {
      res.status(200).json({
        statusText: "OK",
        message: "Success to Get Token Pricelist",
        data: pricelist
      });
    } else {
      res.status(400).json({
        statusText: "Bad Request",
        message: "Failed to Get Token Pricelist"
      });
    }
  } catch (error) {
    console.log("🦄 ~ file: electricityController.js ~ line 80 ~ exports.getTokenPricelist= ~ error", error)
    res.status(500).json({
      statusText: "Internal Server Error",
      message: "Failed to Get Token Pricelist"
    });
  }
};

exports.getTokenAccInfo = async (req, res) => {
  try {
    const {nomor_meter, price} = req.body;
    const user_id = req.user.id;

    if(!nomor_meter || !price) {
      res.status(400).json({
        statusText: "Bad Request",
        message: "Number not registered",
      });
    } 

    const accInfo = await electricityService.getTokenAccInfo(nomor_meter, price, user_id);

    if(accInfo === null) {
      res.status(204).json({
        statusText: "No Content",
      });
    } 
    res.status(200).json({
      statusText: "OK",
      message: "Success Get Electricity Account Info",
      data: accInfo
      });
    
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: "Failed To Get Electricity Account Info"
    });
  }
};

exports.postTagihanBill = async (req, res) => {
  try {
    const user_id = req.user.id;

    if(!req.body.data.IDPEL || req.body.recurringBilling.period !== "Month") {
      res.status(400).json({
        statusText: "Bad Request",
        message: "Failed to Get Electricity Account Info"
      });
    } 

    let {data: accInfo, bankTransferDetails} = await electricityService.createTagihanBill(req.body, user_id);

    bankTransferDetails.Total = accInfo.Total;

    if(accInfo === null || bankTransferDetails === null) {
      res.status(204).json({
        statusText: "No Content",
      });
    } else {
      res.status(200).json({
        statusText: "OK",
        message: "Success to Get Electricity Account Info",
        data: {accInfo, bankTransferDetails}
      });
    }
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });
  };
};

exports.postTokenBill = async (req,res) => {
  try {
    const user_id = req.user.id;

    if(!req.body.data.No_Meter || !req.body.recurringBilling.period) {
      res.status(400).json({
        statusText: "Bad Request",
        message: "Failed to Get Electricity Account Info"
      });
    } 

    let {data: accInfo, bankTransferDetails} = await electricityService.createTokenBill(req.body, user_id);
    bankTransferDetails.Total = accInfo.Total;

    if(accInfo === null || bankTransferDetails === null) {
      res.status(204).json({
        statusText: "No Content"
      });
    } else {
      res.status(200).json({
        statusText: "OK",
        message: "Success to Get Electricity Account Info",
        data: {accInfo, bankTransferDetails}
      });
    }

  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });
  };
}
