const { Router } = require("express");
const authentication = require("../middlewares/authentication");
const { getallreviews, createreviews } = require("../controllers/reviews.controller");

const reviewrouter=Router();

reviewrouter.post("/create",authentication,createreviews);
reviewrouter.get("/product/:productid",authentication,getallreviews);

module.exports=reviewrouter;