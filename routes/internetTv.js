const internetTVController = require("../controller/internetTv");
const router = require("express").Router();

router.get("/internet/options", internetTVController.getInternetTVOptions);
router.get("/internet/account", internetTVController.getInternetAccountInfo);

module.exports = router;
