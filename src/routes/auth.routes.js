const { Router } = require("express");
const { register, login } = require("../controllers/auth.controllers");

const authrouter=Router();

authrouter.post('/signup',register);
authrouter.post('/signin',login);

module.exports={authrouter};