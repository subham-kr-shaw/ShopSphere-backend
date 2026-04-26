const mongoose = require("mongoose");
const schema = mongoose.Schema;

const paymentinfoschema = new schema({
  user: {
    type: schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  paymentmode: {
    type: String,
    enum: ["cod", "online"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  paidat: {
    type: Date,
    default: null,
  },
  createdat: {
    type: Date,
    default: Date.now,
  },
});

const Paymentinfo = mongoose.model("payment_info", paymentinfoschema);
module.exports = Paymentinfo;