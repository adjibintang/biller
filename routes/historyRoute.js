const historyController = require("../controller/historyController");
const middleware = require("../middleware/authMiddleware");
const router = require("express").Router();

router.get(
  "/all",
  middleware.userAuthorization,
  historyController.getAllHistory
);

router.get(
  "/filter/:time",
  middleware.userAuthorization,
  historyController.filterHistory
);
module.exports = router;
