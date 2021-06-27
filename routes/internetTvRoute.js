const internetTVController = require("../controller/internetTvController");
const router = require("express").Router();

router.get("/options/:service_id", internetTVController.getInternetTVOptions);
router.get("/information", internetTVController.getInternetAccountInfo);

module.exports = router;
