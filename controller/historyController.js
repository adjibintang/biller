const historyService = require("../service/historyService");

exports.getAllHistory = async (req, res) => {
  const unfilteredHistory = await historyService.getAllHistory(
    req.user.dataValues.id
  );

  res.send({ unfilteredHistory });
};
