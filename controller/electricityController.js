const { Electricities, Users, Services, Options, Prices } = require('../database/models');
const { Op } = require('sequelize');

exports.getTagihanAccInfo = async (req, res) => {
  try {
    const idPel = req.body.id
    // const {serviceId, optionsId} = req.params

    if(!idPel) {
        res.status(400).json({
          statusText: "Bad Request",
          message: "IDPEL not Found",
        });
      } 

    const isAccExist = await Electricities.findOne({
        where: {customer_number: idPel}
    });

    if(!isAccExist){
      res.status(404).json({
          statusText: "Not Found",
          message: "Incorrect IDPEL"
      });      
    } else {
      res.status(200).json({
        statusText: "OK",
        message: "IDPEL Confirmed",
        data: isAccExist
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
    const serviceId = req.params.id;

    const isServiceIdExist = await Services.findOne({
      where: {id: serviceId}
    });

    if(isServiceIdExist == null){
      res.status(400).json({
        statusText: "Bad Request"
      });
    }

    const electricityOptions = await Services.findAll({
      include: Options,
      where: {id: serviceId}
    });
    
    res.status(200).json({
      statusText: "OK",
      message: "Electricity Options",
      data: electricityOptions[0].dataValues.Options
    });
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });
  };
};

exports.getTokenPricelist = async (req, res) => {
  try {
    const {serviceId, optionsId} = req.query;
    if(serviceId == 1 && optionsId == 1){
      const tokenPricelist = await Prices.findAll();

      res.status(200).json({
        statusText: "OK",
        message: "Token Pricelist",
        data: tokenPricelist
      });
    } else {
      res.status(400).json({
        statusText: "Bad Request",
        message: "",
      });
    }
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });
  }
};

exports.getTokenAccInfo = async (req, res) => {
  try {
    const nomorMeter = req.body.no
    // const {serviceId, optionsId} = req.params

    if(!nomorMeter) {
        res.status(400).json({
          statusText: "Bad Request",
          message: "Please input nomor meter",
        });
      } 

    const isAccExist = await Electricities.findOne({
        where: {meter_number: nomorMeter}
    });

    if(!isAccExist){
      res.status(404).json({
          statusText: "Not Found",
          message: "Number not registered"
      });      
    } else {
      res.status(200).json({
        statusText: "OK",
        message: "Nomor Meter Confirmed",
        data: isAccExist
      });
    }
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: error.message
    });
  }
};

