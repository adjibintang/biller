const internetTVController = require("../controller/internetTvController");
const router = require("express").Router();

router.get("/internet/options", internetTVController.getInternetTVOptions);
router.get(
  "/internet/information",
  internetTVController.getInternetAccountInfo
);

module.exports = router;
