const cart = require("../models/cart.model");
const cartitems = require("../models/cartitems.model");
const product = require("../models/product.model");

const createcart = async (user) => {
    try {
        const carts = await cart.create({ user });
        return carts;
    }
    catch (error) {
        throw new Error(error.message);
    }
}
// const findusercart = async (userid) => {
//     try {
//         const carts = await cart.findOne({ user: userid }).lean();
//         const cartitem = await cartitems.find({ cart: carts._id }).populate("product");
//         carts.cartitems = cartitem;

//         let totalprice = 0;
//         let totaldiscountedprice = 0;
//         let totalitem = 0;
//         for (let items of cartitem) {
//             totalprice += items.price;
//             totaldiscountedprice += items.discountedprice;
//             totalitem += items.quantity;
//         }
//         carts.totalprice = totalprice;
//         carts.discount = totalprice - totaldiscountedprice;
//         carts.totalitem = totalitem;
//         return carts;
//     }
//     catch (error) {
//         throw new Error(error.message);
//     }
// }
const findusercart = async (userid) => {
    try {
        const carts = await cart.findOne({ user: userid }).lean();

        if (!carts) return null; // ✅ safety check

        const cartitem = await cartitems
            .find({ cart: carts._id })
            .populate("product");

        carts.cartitems = cartitem;

        let totalprice = 0;
        let totaldiscountedprice = 0;
        let totalitem = 0;

        for (let item of cartitem) {
            const price = item.price || item.product.price;
            const discounted = item.discountedprice || item.product.discountedprice;

            totalprice += price * item.quantity;
            totaldiscountedprice += discounted * item.quantity;
            totalitem += item.quantity;
        }

        carts.totalprice = totalprice;
        carts.totaldiscountedprice = totaldiscountedprice; // ✅ FIX
        carts.discount = totalprice - totaldiscountedprice;
        carts.totalitem = totalitem;

        return carts;

    } catch (error) {
        throw new Error(error.message);
    }
};
const additemcart = async (userid, req) => {
    try {
        const carts = await cart.findOne({ user: userid });
        const prod = await product.findById(req.body.productid);
        console.log(prod);

        const ispresent = await cartitems.findOne({ cart: carts._id, product: prod._id, userid });
        const qty=req.body.quantity||1;
        if (!ispresent) {
            const cartitem = await cartitems.create({
                cart: carts._id,
                product: prod._id,
                quantity: qty,
                userid,
                price: prod.price,
                size: req.body.size,
                discountedprice: prod.discountedprice
            });
            carts.cartitems.push(cartitem._id);
            await carts.save();
            return "item added to cart";
        }
        else {
            ispresent.quantity += qty;
            await ispresent.save();
        }
        carts.save();
    }
    catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { createcart, additemcart, findusercart };
