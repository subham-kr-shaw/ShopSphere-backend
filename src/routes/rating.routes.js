const { Router } = require("express");
const authentication = require("../middlewares/authentication");
const { createratings, getallratings } = require("../controllers/rating.controller");

const ratingrouter = Router();
ratingrouter.post('/create', authentication, createratings);
ratingrouter.put('/product/:productid', authentication, getallratings);

module.exports = ratingrouter;