const paymentRoute = require('express').Router();
const {uploadFile} = require('../controller/uploadFileController');
const firebase = require('../middleware/firebase');

paymentRoute.post("/upload", firebase.upload.single("receipt"), uploadFile);

module.exports = paymentRoute;