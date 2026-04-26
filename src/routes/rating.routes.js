// const { Router } = require("express");
// const authentication = require("../middlewares/authentication");
// const { createratings, getallratings } = require("../controllers/rating.controller");

// const ratingrouter = Router();
// ratingrouter.post('/create', authentication, createratings);
// ratingrouter.put('/product/:productid', authentication, getallratings);

// module.exports = ratingrouter;
const { Router } = require("express");
const authentication = require("../middlewares/authentication");
const { createratings, getallratings, deleteratings } = require("../controllers/rating.controller");

const ratingrouter = Router();
ratingrouter.post('/create', authentication, createratings);
ratingrouter.get('/product/:productid', authentication, getallratings); // ✅ GET not PUT
ratingrouter.delete('/:ratingid', authentication, deleteratings);       // ✅ delete route

module.exports = ratingrouter;