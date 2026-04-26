const { Router } = require("express");
const authentication = require("../middlewares/authentication");
const isadmin = require("../middlewares/isadmin");
const { getallorders, shiporders, confirmedorders, cancellorder, deleteorders, deliverorders } = require("../controllers/adminorder.controller");

const adminrouter = Router();
adminrouter.get('/', authentication, isadmin, getallorders);
adminrouter.put('/:orderid/ship', authentication, isadmin, shiporders);
adminrouter.put('/:orderid/confirm', authentication, isadmin, confirmedorders);
adminrouter.put('/:orderid/cancel', authentication, isadmin, cancellorder);
adminrouter.delete('/:orderid/delete', authentication, isadmin, deleteorders);
adminrouter.put('/:orderid/deliver', authentication, isadmin, deliverorders);

module.exports = adminrouter;
// const { Router } = require("express");
// const authentication = require("../middlewares/authentication");
// const { getallorders, shiporders, confirmedorders, cancellorder, deleteorders, deliverorders } = require("../controllers/adminorder.controller");

// const adminrouter = Router();
// adminrouter.get('/', authentication, getallorders);
// adminrouter.put('/:orderid/ship', authentication, shiporders);
// adminrouter.put('/:orderid/confirm', authentication, confirmedorders);
// adminrouter.put('/:orderid/cancel', authentication, cancellorder);
// adminrouter.delete('/:orderid/delete', authentication, deleteorders);  // ✅ DELETE method
// adminrouter.put('/:orderid/deliver', authentication, deliverorders);

// module.exports = adminrouter;