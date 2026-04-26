// const { Router } = require("express");
// const authentication = require("../middlewares/authentication");
// const { getallreviews, createreviews } = require("../controllers/reviews.controller");

// const reviewrouter=Router();

// reviewrouter.post("/create",authentication,createreviews);
// reviewrouter.get("/product/:productid",authentication,getallreviews);

// module.exports=reviewrouter;

const { Router } = require("express");
const authentication = require("../middlewares/authentication");
const { getallreviews, createreviews, deletereviews } = require("../controllers/reviews.controller");

const reviewrouter = Router();

reviewrouter.post("/create", authentication, createreviews);
reviewrouter.get("/product/:productid", authentication, getallreviews);
// reviewrouter.delete("/:reviewid", authentication, deletereviews); // ✅ delete route
reviewrouter.delete("/:reviewid", authentication, deletereviews); // ✅ must exist

module.exports = reviewrouter;