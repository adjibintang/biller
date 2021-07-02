const Router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const mobile_cards = require("../controller/mobilecardsController");

Router.get("/cards", auth.userAuthorization, mobile_cards.getcards);

module.exports = Router;
