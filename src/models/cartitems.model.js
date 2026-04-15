const mongoose = require("mongoose");
const schema = mongoose.Schema;

const cartitemsschema = new schema({
    cart: {
        type: schema.Types.ObjectId,
        ref: "cart",
        required: true,
    },
    product: {
        type: schema.Types.ObjectId,
        ref: "product",
        required: true,
    },
    size: {
        type:String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountedprice: {
        type: Number,
        required: true,
    },
    userid: {
        type: schema.Types.ObjectId,
        ref: "users",
        required: true,
    }
})
const cartitems = mongoose.model("cartitem", cartitemsschema);
module.exports = cartitems;