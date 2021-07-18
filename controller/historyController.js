const historyService = require("../service/historyService");

exports.getAllHistory = async (req, res) => {
  try {
    const allUserHistory = await historyService.getAllHistory(
      req.user.dataValues.id
    );

    if (!allUserHistory) {
      return res.status(202).send({
        statusCode: 202,
        statusText: "Accepted",
        message: "There is no succes transaction to be shown",
      });
    }

    const result = await historyService.groupTransactionDate(allUserHistory);

    res.status(200).send({
      statusCode: 200,
      statusText: "OK",
      message: "Success to Get User History",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      statusCode: 500,
      statusText: "Internal Server Error",
      message: "Failed to Get User History",
    });
  }
};

exports.filterHistory = async (req, res) => {
  try {
    let userHistory = await historyService.getAllHistory(
      req.user.dataValues.id
    );

    if (!userHistory) {
      return res.status(202).send({
        statusCode: 202,
        statusText: "Accepted",
        message: "There is no succes transaction to be shown",
      });
    }

    const filteredHistory = await historyService.filterHistory(
      userHistory,
      req.params.time
    );

    const result = await historyService.groupTransactionDate(filteredHistory);

    return res.status(200).send({
      statusCode: 200,
      statusText: "OK",
      message: "Success to Get User History",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      statusCode: 500,
      statusText: "Internal Server Error",
      message: "Failed to Get User History",
    });
  }
};
