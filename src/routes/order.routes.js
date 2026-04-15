const { Router } = require("express");
const authentication = require("../middlewares/authentication");
const { createorders, orderhistory, findorderbyids } = require("../controllers/order.controller");

const orderrouter = Router();

orderrouter.post("/", authentication, createorders);
orderrouter.get("/user", authentication, orderhistory);
orderrouter.get("/:id", authentication, findorderbyids);

module.exports = orderrouter;