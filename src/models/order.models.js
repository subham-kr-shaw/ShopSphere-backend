const mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderschema = new schema({
  user: {
    type: schema.Types.ObjectId,
    ref: "users",
  },
  orderitems: [{
    type: schema.Types.ObjectId,
    ref: "orderitems"
  }],
  orderDate: {
    type: Date,
    required: true,
    default: Date.now()
  },
  deliveryDate: {
    type: Date,
  },
  shippingaddress: {
    type: schema.Types.ObjectId,
    ref: "address",
  },
  Paymentdetails: {
    paymentmethod: {
      type: String,
    },
    transactionid: {
      type: String,
    },
    paymentid: {
      type: String,
    },
    paymentstatus: {
      type: String,
      default: "pending",
    }
  },
  totalprice: {
    type: Number,
    required: true,
  },
  totaldiscountedprice: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  orderstatus: {
    type: String,
    required: true,
    default: "pending",
  },
  createdate: {
    type: Date,
    default: Date.now(),
  }
})

const order = mongoose.model("order", orderschema);
module.exports = order;