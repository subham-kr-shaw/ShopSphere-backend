const { Router } = require("express");
const authentication = require("../middlewares/authentication");
const { getallproducts, findproductbyids } = require("../controllers/product.controllers");

const productrouter = Router();

productrouter.get('/',authentication,getallproducts);
productrouter.get('/id/:id',authentication, findproductbyids );

module.exports = productrouter;