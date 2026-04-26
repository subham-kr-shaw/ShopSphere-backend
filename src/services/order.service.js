
// const address = require("../models/address.models");
// const order = require("../models/order.models");
// const orderitems = require("../models/orderitem.model");
// const { findusercart } = require("./cart.service");

// const createorder = async (shippingadd, user) => {
//     let add;
//     try {
//         if (shippingadd._id) {
//             add = await address.findById(shippingadd._id);
//         } else {
//             add = new address(shippingadd);
//             add.user = user._id;
//             await add.save();

//             user.address.push(add._id);
//             await user.save();
//         }

//         const cart = await findusercart(user._id);

//         if (!cart.cartitems || cart.cartitems.length === 0) {
//             throw new Error("Cart is empty!");
//         }

//         const orderitem = [];
//         for (let items of cart.cartitems) {
//             const orderit = new orderitems({
//                 price: items.price,
//                 product: items.product._id || items.product,
//                 quantity: items.quantity,
//                 size: items.size,
//                 userid: user._id,
//                 discountedprice: items.discountedprice,
//             })
//             const createorderitem = await orderit.save();
//             orderitem.push(createorderitem);
//         }

//         const orders = new order({
//             user: user._id,
//             orderitems:orderitem,
//             totalprice: cart.totalprice,
//             totaldiscountedprice: cart.totaldiscountedprice,
//             discount: cart.discount,
//             totalitem: cart.totalitem,
//             shippingaddress: add._id,
//         })

//         const saveorder = await orders.save();
//         return saveorder;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }

// const placeorder = async (orderid) => {
//     const orders = await findorderbyid(orderid);
//     orders.orderstatus = "PLACED";
//     orders.paymentstatus = "COMPLETED";
//     return await orders.save();
// }

// const confirmedorder = async (orderid) => {
//     const orders = await findorderbyid(orderid);
//     orders.orderstatus = "CONFIRMED";
//     return await orders.save();
// }

// const deliverorder = async (orderid) => {
//     const orders = await findorderbyid(orderid);
//     orders.orderstatus = "DELIVERED";
//     return await orders.save();
// }

// const cancelorder = async (orderid) => {
//     const orders = await findorderbyid(orderid);
//     orders.orderstatus = "CANCELLED";
//     return await orders.save();
// }

// const findorderbyid = async (orderid) => {
//     // ✅ fixed: orderitems -> orderitem to match model field
//     const orders = await order.findById(orderid)
//         .populate("user")
//         .populate({ path: "orderitems", populate: { path: "product" } })
//         .populate("shippingaddress");
//     return orders;
// }

// const userorderhistory = async (userid) => {
//     try {
//         // ✅ fixed: renamed result variable to avoid conflict with model name
//         const orders = await order.find({ user: userid, orderstatus: "PLACED" })
//             .populate({ path: "orderitem", populate: { path: "product" } })
//             .lean();
//         return orders;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }

// const getallorder = async () => {
//     // ✅ fixed: orderitems -> orderitem
//     return await order.find()
//         .populate({ path: "orderitems", populate: { path: "product" } })
//         .lean();
// }

// // const removeorder = async (orderid) => {
// //     const orders = await findorderbyid(orderid);
// //     // ✅ fixed: findByIdandDelete -> findByIdAndDelete (capital A and D)
// //     await order.findByIdAndDelete(orders._id);
// // }

// const shiporder = async (orderid) => {
//     const orders = await findorderbyid(orderid);
//     orders.orderstatus = "SHIPPED";
//     return orders.save();
// }
// // const removeorder = async (orderid) => {
// //     // ✅ Directly delete by id, no need to find first
// //     const deleted = await order.findByIdAndDelete(orderid);
// //     if (!deleted) {
// //         throw new Error("Order not found");
// //     }
// //     return deleted;
// // };
// const removeorder = async (orderid) => {
//     // ✅ Find the order first to get orderitems ids
//     const existingorder = await order.findById(orderid);
//     if (!existingorder) {
//         throw new Error("Order not found");
//     }

//     // ✅ Delete all related orderitems from orderitems collection
//     if (existingorder.orderitems && existingorder.orderitems.length > 0) {
//         await orderitems.deleteMany({ _id: { $in: existingorder.orderitems } });
//     }

//     // ✅ Now delete the order itself
//     await order.findByIdAndDelete(orderid);
// };

// module.exports = {
//     getallorder,
//     shiporder,
//     userorderhistory,
//     removeorder,
//     findorderbyid,
//     cancelorder,
//     placeorder,
//     deliverorder,
//     confirmedorder,
//     createorder,
// }
const address = require("../models/address.models");
const order = require("../models/order.models");
const orderitems = require("../models/orderitem.model");
const { findusercart } = require("./cart.service");

const createorder = async (shippingadd, user) => {
    let add;
    try {
        if (shippingadd._id) {
            add = await address.findById(shippingadd._id);
        } else {
            add = new address(shippingadd);
            add.user = user._id;
            await add.save();
            user.address.push(add._id);
            await user.save();
        }

        const cart = await findusercart(user._id);
        if (!cart.cartitems || cart.cartitems.length === 0) {
            throw new Error("Cart is empty!");
        }

        const orderitem = [];
        for (let items of cart.cartitems) {
            const orderit = new orderitems({
                price: items.price,
                product: items.product._id || items.product,
                quantity: items.quantity,
                size: items.size,
                userid: user._id,
                discountedprice: items.discountedprice,
            });
            const createorderitem = await orderit.save();
            orderitem.push(createorderitem);
        }

        const orders = new order({
            user: user._id,
            orderitems: orderitem,
            totalprice: cart.totalprice,
            totaldiscountedprice: cart.totaldiscountedprice,
            discount: cart.discount,
            totalitem: cart.totalitem,
            shippingaddress: add._id,
        });

        return await orders.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

const findorderbyid = async (orderid) => {
    const orders = await order.findById(orderid)
        .populate("user")
        .populate({ path: "orderitems", populate: { path: "product" } })
        .populate("shippingaddress");

    if (!orders) throw new Error(`Order not found with id: ${orderid}`);
    return orders;
};

const placeorder = async (orderid) => {
    const orders = await findorderbyid(orderid);
    orders.orderstatus = "PLACED";
    orders.paymentstatus = "COMPLETED";
    return await orders.save();
};

const confirmedorder = async (orderid) => {
    const orders = await findorderbyid(orderid);
    orders.orderstatus = "CONFIRMED";
    return await orders.save();
};

const shiporder = async (orderid) => {
    const orders = await findorderbyid(orderid);
    orders.orderstatus = "SHIPPED";
    return await orders.save();
};

const deliverorder = async (orderid) => {
    const orders = await findorderbyid(orderid);
    orders.orderstatus = "DELIVERED";
    return await orders.save();
};

const cancelorder = async (orderid) => {
    const orders = await findorderbyid(orderid);
    orders.orderstatus = "CANCELLED";
    return await orders.save();
};

const removeorder = async (orderid) => {
    const existingorder = await order.findById(orderid);
    if (!existingorder) throw new Error("Order not found");
    if (existingorder.orderitems?.length > 0) {
        await orderitems.deleteMany({ _id: { $in: existingorder.orderitems } });
    }
    await order.findByIdAndDelete(orderid);
};

// ✅ Fixed — was using wrong field "orderitem", now "orderitems"
// ✅ Also removed orderstatus filter so ALL orders show in history, not just PLACED
// const userorderhistory = async (userid) => {
//     try {
//         const orders = await order.find({ user: userid })
//             .populate({ path: "orderitems", populate: { path: "product" } })
//             .populate("shippingaddress")
//             .sort({ orderDate: -1 })  // newest first
//             .lean();
//         return orders;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };
// ✅ Only this function needs to change in your order.service.js
// Replace your existing userorderhistory with this:

const userorderhistory = async (userid) => {
    try {
        // ✅ Removed orderstatus filter — fetch ALL orders for this user
        // ✅ Fixed field name: "orderitems" not "orderitem"
        const orders = await order.find({ user: userid })
            .populate({ path: "orderitems", populate: { path: "product" } })
            .populate("shippingaddress")
            .sort({ orderDate: -1 })  // newest first
            .lean();
        return orders;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getallorder = async () => {
    return await order.find()
        .populate({ path: "orderitems", populate: { path: "product" } })
        .lean();
};

module.exports = {
    createorder,
    findorderbyid,
    placeorder,
    confirmedorder,
    shiporder,
    deliverorder,
    cancelorder,
    removeorder,
    userorderhistory,
    getallorder,
};