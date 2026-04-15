const { Router } = require("express");
const { getuserproflie, getalluser } = require("../controllers/user.controllers");


const userrouter=Router();

userrouter.get('/profile',getuserproflie);
userrouter.get('/',getalluser);
module.exports={userrouter};