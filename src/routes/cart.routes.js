const { Router } = require("express");
const authentication = require("../middlewares/authentication");
const { findusercarts, additemtocart } = require("../controllers/cart.controller");

const cartrouter = Router();
cartrouter.get('/', authentication, findusercarts);
cartrouter.put('/add', authentication, additemtocart);

module.exports = cartrouter;