const { Router } = require("express");
const authentication = require("../middlewares/authentication");
const { updatecartitem, removecartitems } = require("../controllers/cartitems.controller");

const cartitemrouter = Router();
cartitemrouter.put("/:id", authentication, updatecartitem);
cartitemrouter.delete("/:id", authentication, removecartitems);
module.exports = cartitemrouter;