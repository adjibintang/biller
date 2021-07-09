const Router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const mobile_cards = require("../controller/mobilecardsController");

Router.get("/cards",  mobile_cards.getcards);
// auth.userAuthorization, 
(module.exports = Router);
