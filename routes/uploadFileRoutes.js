const paymentRoute = require('express').Router();
const {uploadFile} = require('../controller/paymentController');
const firebase = require('../middleware/firebase');

paymentRoute.post("/upload", firebase.upload.single("receipt"), uploadFile);

module.exports = paymentRoute;