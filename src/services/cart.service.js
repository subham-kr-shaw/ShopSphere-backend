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
        if (!carts) return null;

        const cartitem = await cartitems.find({ cart: carts._id }).populate("product");
        carts.cartitems = cartitem;

        let totalprice = 0;
        let totaldiscountedprice = 0;
        let totalitem = 0;

        for (let item of cartitem) {
            totalprice += item.price;               // ✅ already = product.price × quantity
            totaldiscountedprice += item.discountedprice;  // ✅ already = product.discountedprice × quantity
            totalitem += item.quantity;
        }

        carts.totalprice = totalprice;
        carts.totaldiscountedprice = totaldiscountedprice; // ✅ was missing before
        carts.discount = totalprice - totaldiscountedprice;
        carts.totalitem = totalitem;

        return carts;
    } catch (error) {
        throw new Error(error.message);
    }
}
// const additemcart = async (userid, req) => {
//     try {
//         const carts = await cart.findOne({ user: userid });
//         const prod = await product.findById(req.body.productid);
//         console.log(prod);

//         const ispresent = await cartitems.findOne({ cart: carts._id, product: prod._id, userid });
//         if (!ispresent) {
//             const cartitem = await cartitems.create({
//                 cart: carts._id,
//                 product: prod._id,
//                 quantity: 1,
//                 userid,
//                 price: prod.price,
//                 size: req.body.size,
//                 discountedprice: prod.discountedprice
//             });
//             carts.cartitems.push(cartitem._id);
//             await carts.save();
//             return "item added to cart";
//         }
//         carts.save();
//     }
//     catch (error) {
//         throw new Error(error.message);
//     }
// }
const additemcart = async (userid, req) => {
    try {
        const carts = await cart.findOne({ user: userid });
        const prod = await product.findById(req.body.productid);

        const ispresent = await cartitems.findOne({
            cart: carts._id,
            product: prod._id,
            size: req.body.size  // same product but different size = new item
        });

        if (!ispresent) {
            // product not in cart OR same product with different size → add new entry
            const cartitem = await cartitems.create({
                cart: carts._id,
                product: prod._id,
                quantity: 1,
                userid,
                price: prod.price,
                size: req.body.size,
                discountedprice: prod.discountedprice
            });
            carts.cartitems.push(cartitem._id);
            await carts.save();
            return "item added to cart";
        }
        // same product + same size already exists → increment quantity
    }
    catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { createcart, additemcart, findusercart };
