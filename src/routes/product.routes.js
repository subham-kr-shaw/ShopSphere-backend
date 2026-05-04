const { Router } = require("express");
const authentication = require("../middlewares/authentication");
const { getallproducts, findproductbyids } = require("../controllers/product.controllers");

const productrouter = Router();

productrouter.get('/',  getallproducts);
productrouter.get('/id/:id', findproductbyids );

module.exports = productrouter;