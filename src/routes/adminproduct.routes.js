const { Router } = require("express");
const authentication = require("../middlewares/authentication");
const { createmultipleproducts, createproducts, deleteproducts, updateproducts } = require("../controllers/product.controllers");

const adminproductrouter=Router();
adminproductrouter.post("/",authentication,createproducts);
adminproductrouter.post("/creates",authentication,createmultipleproducts);
adminproductrouter.delete("/:id",authentication,deleteproducts);
adminproductrouter.post("/:id",authentication,updateproducts);

module.exports=adminproductrouter;