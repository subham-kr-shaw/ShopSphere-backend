const { Router } = require("express");
const { getuserproflie, getalluser } = require("../controllers/user.controllers");


const userrouter=Router();

userrouter.get('/profile',getuserproflie);
userrouter.get('/',getalluser);
module.exports={userrouter};

// const { Router } = require("express");
// const { getuserproflie, getalluser } = require("../controllers/user.controllers");
// const authentication = require("../middlewares/authentication");

// const userrouter = Router();

// // ✅ authentication middleware handles token — no need to read it manually in controller
// userrouter.get('/profile', getuserproflie);
// userrouter.get('/', getalluser);

// module.exports = { userrouter };