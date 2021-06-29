const electricityService = require('../service/electricityService');

exports.getTagihanAccInfo = async (req, res) => {
  try {
    const idPel = req.body.idpel

    if(!idPel) {
      res.status(400).json({
        statusText: "Bad Request",
        message: "Failed to Get Electricity Account Info"
      });
    } 
    const accInfo = await electricityService.getTagihanAccInfo(idPel);

    if(accInfo === null) {
      res.status(204).json({
        statusText: "No Content",
      });
    } else {
    res.status(200).json({
      statusText: "OK",
      message: "Success to Get Electricity Account Info",
      data: {
        IDPEL: accInfo.customer_number,
        Name: accInfo.name,
        Tarif_Daya: `R${accInfo.rates}/${accInfo.power} VA`,
        Bulan_Tahun: accInfo.createdAt.toLocaleString('default',{month: 'long'}) + " " + accInfo.createdAt.getFullYear(), 
        Stand_Meter: accInfo.this_month_stand_meter,
        Bill: 0,
        Admin: 0,
        Total: 0
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: "Failed to Get Electricity Account Info"
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
    res.status(500).json({
      statusText: "Internal Server Error",
      message: "Failed to Get Token Pricelist"
    });
  }
};

exports.getTokenAccInfo = async (req, res) => {
  try {
    const nomorMeter = req.body.nomor_meter

    if(!nomorMeter) {
      res.status(400).json({
        statusText: "Bad Request",
        message: "Number not registered",
      });
    } 

    const accInfo = await electricityService.getTokenAccInfo(nomorMeter);

    if(accInfo === null) {
      res.status(204).json({
        statusText: "No Content",
      });
    } else {
    res.status(200).json({
      statusText: "OK",
      message: "Success Get Electricity Account Info",
      data: {
        No_Meter: accInfo.meter_number,
        IDPEL: accInfo.customer_number,
        Name: accInfo.name,
        Tarif_Daya: `R${accInfo.rates}/${accInfo.power} VA`,
        Token: 0,
        PPJ: 0,
        Admin: 0,
        Total: 0
      }
      });
    }
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: "Failed To Get Electricity Account Info"
    });
  }
};

