const landlineService = require("../service/landlineService");

exports.getLandlineAccInfo = async (req, res) => {
  try {
    const telephoneNumber = req.body.telephone_number;

    if(!telephoneNumber){
      res.status(400).json({
        statusText: "Bad Request",
        message: "Failed To Get Landline Account Info",
      });
    }

    const accInfo = await landlineService.getAccInfo(telephoneNumber);
    
    if(accInfo === null) {
      res.status(204).json({
        statusText: "No Content",
      });
    } else {
    res.status(200).json({
      statusText: "OK",
      message: "Success To Get Landline Account Info",
      data: {
        No_Telephone: accInfo.telephone_number,
        Bill: `Rp. 108.000,00`,
        Admin: `Rp. 2.500,00`,
        Total: `Rp. 110.500,00`,
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      statusText: "Internal Server Error",
      message: "Failed To Get Landline Account Info"
    });
  }
};
