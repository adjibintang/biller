const internetTVController = require("../controller/internetTVController");
const middleware = require("../middleware/authMiddleware");
const router = require("express").Router();

router.get(
  "/options/:service_id",
  middleware.userAuthorization,
  internetTVController.getInternetTVOptions
);
router.get(
  "/information",
  middleware.userAuthorization,
  internetTVController.getInternetAccountInfo
);

router.post(
  "/bill",
  middleware.userAuthorization,
  internetTVController.createInternetTVBill
);

module.exports = router;
