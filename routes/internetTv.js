const internetTVController = require("../controller/internetTv");
const router = require("express").Router();

router.get("/internet/options", internetTVController.getInternetTVOptions);
router.get(
  "/internet/information",
  internetTVController.getInternetAccountInfo
);

module.exports = router;
