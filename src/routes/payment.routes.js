const { Router } = require("express");
const { savepayment, getpayments } = require("../controllers/payment.controllers");
 
const paymentrouter = Router();
 
paymentrouter.post("/save", savepayment);   // called when user places order
paymentrouter.get("/", getpayments);         // fetch user's payment history
 
module.exports = { paymentrouter };