const { Router } = require("express");
const authentication = require("../middlewares/authentication");
const { getallorders, shiporders, confirmedorders, cancellorder, deleteorders, deliverorders } = require("../controllers/adminorder.controller");


const adminrouter = Router();
adminrouter.get('/', authentication, getallorders);
adminrouter.put('/:orderid/ship', authentication, shiporders);
adminrouter.put('/:orderid/confirm', authentication, confirmedorders);
adminrouter.put('/:orderid/cancel', authentication, cancellorder);
adminrouter.put('/:orderid/delete', authentication, deleteorders);
adminrouter.put('/:orderid/deliver', authentication, deliverorders);

module.exports = adminrouter;