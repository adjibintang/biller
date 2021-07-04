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
      });
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
    console.log("🦄 ~ file: electricityController.js ~ line 54 ~ exports.getElectricityOptions= ~ error", error)
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
    const nomorMeter = req.body.nomor_meter;
    const price = req.body.price;

    if(!nomorMeter) {
      res.status(400).json({
        statusText: "Bad Request",
        message: "Number not registered",
      });
    } 
    if(!price) {
      res.status(400).json({
        statusText: "Bad Request",
        message: "Must input price",
      });
    }

    const accInfo = await electricityService.getTokenAccInfo(nomorMeter, price);

    if(accInfo === null) {
      res.status(204).json({
        statusText: "No Content",
      });
    } else {
    res.status(200).json({
      statusText: "OK",
      message: "Success Get Electricity Account Info",
      data: accInfo
      });
    }
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: "Failed To Get Electricity Account Info"
    });
  }
};

exports.postTagihanBill = async (req, res) => {
  try {
    const {
      IDPEL, Name, Tarif_Daya, Bulan_Tahun, Stand_Meter, Bill, Admin, Late_Payment_Fee, Total,
      payment_type, period, date_billed, bankAccName, bankAccNumber, bankName, url
    } = req.body; 
    const user_id = req.user.id;

    if(!IDPEL) {
      res.status(400).json({
        statusText: "Bad Request",
        message: "Failed to Get Electricity Account Info"
      });
    } 

    if(!bankAccNumber || !bankAccName) {
      res.status(400).json({
        statusText: "Bad Request",
        message: "Failed to Get Electricity Account Info"
      });
    }

    let {data: accInfo, bankTransfer} = await electricityService.createTagihanBill(
      user_id,
      payment_type, period, date_billed, bankAccName, bankAccNumber, bankName, url,
      IDPEL, Name, Tarif_Daya, Bulan_Tahun, Stand_Meter, Bill, Admin, Late_Payment_Fee, Total
      );

    bankTransfer.Total = accInfo.Total;

    if(accInfo === null || bankTransfer === null) {
      res.status(204).json({
        statusText: "No Content",
      });
    } else {
      res.status(200).json({
        statusText: "OK",
        message: "Success to Get Electricity Account Info",
        data: {accInfo, bankTransfer}
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
    const {
      payment_type, period, date_billed, bankAccName, bankAccNumber, bankName, url,
      No_Meter, IDPEL, Name, Tarif_Daya, Token, PPJ, Admin, Total
    } = req.body; 
    const user_id = req.user.id;

    if(!No_Meter) {
      res.status(400).json({
        statusText: "Bad Request",
        message: "Failed to Get Electricity Account Info"
      });
    } 

    if(!bankAccNumber || !bankAccName) {
      res.status(400).json({
        statusText: "Bad Request",
        message: "Failed to Get Electricity Account Info"
      });
    }

    let {data: accInfo, bankTransfer} = await electricityService.createTokenBill(
      user_id,
      payment_type, period, date_billed, bankAccName, bankAccNumber, bankName, url,
      No_Meter, IDPEL, Name, Tarif_Daya, Token, PPJ, Admin, Total
      );

    bankTransfer.Total = accInfo.Total;

    if(accInfo === null || bankTransfer === null) {
      res.status(204).json({
        statusText: "No Content",
      });
    } else {
      res.status(200).json({
        statusText: "OK",
        message: "Success to Get Electricity Account Info",
        data: {accInfo, bankTransfer}
      });
    }
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });
  };
};
