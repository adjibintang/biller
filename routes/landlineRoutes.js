const express = require('express');
const router = express.Router();

const { getLandlineAccInfo } = require('../controller/landlineController');

router.get("/landline/receipt", getLandlineAccInfo);

module.exports = router;