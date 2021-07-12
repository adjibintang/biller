const internetTVController = require("../controller/internetTvController");
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

module.exports = router;
