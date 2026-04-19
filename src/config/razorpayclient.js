const Razorpay = require('razorpay');

const apikey="sss";
const api_secret="sss";

const razorpay= new Razorpay({
  key_id: apikey,
  key_secret: api_secret,
});
module.exports =razorpay;