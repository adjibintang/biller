const electricityService = require('../service/electricityService');

exports.getTagihanAccInfo = async (req, res) => {
  try {
    const idPel = req.body.id

    if(!idPel) {
      res.status(400).json({
        statusText: "Bad Request",
        message: "Failed to Get Account Info"
      });
    } 
    const accInfo = await electricityService.getTagihanAccInfo(idPel);

    res.status(200).json({
      statusText: "OK",
      message: "Success to Get Account Info",
      data: {
        IDPEL: accInfo.customer_number,
        Name: accInfo.name,
        Tarif_Daya: `${accInfo.rates}/${accInfo.power}`,
        Bulan_Tahun: accInfo.createdAt.toLocaleString('default',{month: 'long'}) + " " + accInfo.createdAt.getFullYear(), 
        Stand_Meter: accInfo.this_month_stand_meter,
        Bill: 0,
        Admin: 0,
        Total: 0
      }
    });
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: "Failed to Get Account Info"
    });
  };
};

exports.getElectricityOptions = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const electricityOptions = await electricityService.getElectricityOptions(serviceId);
    
    res.status(200).json({
      statusText: "OK",
      message: "Electricity Options",
      data: electricityOptions
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
    const option_id = req.body.id
    const tokenPricelist = await electricityService.getTokenPricelist(option_id);

    if(tokenPricelist !== null) {
      res.status(200).json({
        statusText: "OK",
        message: "Success to Get Token Pricelist",
        data: tokenPricelist
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
    
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: "Failed To Get Active Subscription"
    });
  }
};

