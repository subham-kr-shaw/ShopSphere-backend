// const address = require("../models/address.models");
// const order = require("../models/order.models");
// const orderitems = require("../models/orderitem.model");
// const { findusercart } = require("./cart.service");
// const { findproductbyid } = require("./product.service");

// // const createorder = async (shippingadd, user) => {
// //     let add;
// //     try {
// //         if (shippingadd._id) {
// //             const isexist = await address.findById(shippingadd._id);
// //             add = isexist;
// //         }
// //         else {
// //             add = new address(shippingadd);
// //             add.user = user;
// //             await add.save();

// //             user.address.push(add._id);
// //             await user.save();
// //         }
// //         const cart = await findusercart(user._id);
// //         const orderitem = [];
// //         console.log(cart);
// //         for (let items of cart.cartitems) {
// //             const orderit = new orderitems({
// //                 price: items.price,
// //                 product: items.product,
// //                 quantity: items.quantity,
// //                 size: items.size,
// //                 userid: user._id,
// //                 discountedprice: items.discountedprice,
// //             })
// //             const createorderitem = await orderit.save();
// //             // console.log(createorderitem);
// //             orderitem.push(createorderitem);  
// //         }
// //         const orders = new order({
// //             user:user._id,
// //             orderitem,
// //             totalprice: cart.totalprice,
// //             totaldiscountedprice: cart.totaldiscountedprice,
// //             discount: cart.discount,
// //             totalitem: cart.totalitem,
// //             shippingaddress: add._id,
// //         })
// //         const saveorder=await orders.save();
// //         return saveorder;
// //     }
// //     catch (error) {
// //         throw new Error(error.message);
// //     }
// // }  

// const createorder = async (shippingadd, user) => {
//     let add;
//     try {
//         if (shippingadd._id) {
//             add = await address.findById(shippingadd._id);
//         } else {
//             add = new address(shippingadd);
//             add.user = user._id; // ✅ store id not full object
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
//                 product: items.product._id || items.product, // ✅ handle populated or ref
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
//             orderitem,
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
// const placeorder=async (orderid) => {
//     const order=await findorderbyid(orderid);
//     order.orderstatus="PLACED";
//     order.paymentstatus="COMPLETED";

//     return await order.save();
// }

// const confirmedorder=async(orderid)=>{
//     const order=await findorderbyid(orderid);
//     order.orderstatus="CONFIRMED";
//     return await order.save();
// }

// const deliverorder=async(orderid)=>{
//     const order=await findorderbyid(orderid);
//     order.orderstatus="DELIVERED";
//     return await order.save();
// }

// const cancelorder=async(orderid)=>{
//     const order=await findorderbyid(orderid);
//     order.orderstatus="CANCELLED";
//     return await order.save();
// }


// const findorderbyid=async(orderid)=>{
//     const orders=await order.findById(orderid)
//     .populate("user")
//     .populate({path:"orderitems",populate:{path:"product"}})
//     .populate("shippingaddress");

//     return orders;
// }


// const userorderhistory=async(userid)=>{
//     try{
//       const order=await order.find({user:userid,orderstatus:"PLACED",})
//       .populate({path:"orderitems",populate:{path:"product"}}).lean();

//       return order;
//     }
//     catch(error){
//         throw new Error(error.message);
//     }
// }

// const getallorder=async()=>{
//     return await order.find()
//     .populate({path:"orderitems",populate:{path:"product"}}).lean();
// }

// const removeorder=async(orderid)=>{
//    const order=await findorderbyid(orderid);
//    await order.findByIdandDelete(order._id);
// }
// const shiporder=async(orderid)=>{
//     const order=await findorderbyid(orderid);
//     order.orderstatus="SHIPPED";
//     return order.save();
// }
// module.exports={
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
            })
            const createorderitem = await orderit.save();
            orderitem.push(createorderitem);
        }

        const orders = new order({
            user: user._id,
            orderitem,
            totalprice: cart.totalprice,
            totaldiscountedprice: cart.totaldiscountedprice,
            discount: cart.discount,
            totalitem: cart.totalitem,
            shippingaddress: add._id,
        })

        const saveorder = await orders.save();
        return saveorder;
    } catch (error) {
        throw new Error(error.message);
    }
}

const placeorder = async (orderid) => {
    const orders = await findorderbyid(orderid);
    orders.orderstatus = "PLACED";
    orders.paymentstatus = "COMPLETED";
    return await orders.save();
}

const confirmedorder = async (orderid) => {
    const orders = await findorderbyid(orderid);
    orders.orderstatus = "CONFIRMED";
    return await orders.save();
}

const deliverorder = async (orderid) => {
    const orders = await findorderbyid(orderid);
    orders.orderstatus = "DELIVERED";
    return await orders.save();
}

const cancelorder = async (orderid) => {
    const orders = await findorderbyid(orderid);
    orders.orderstatus = "CANCELLED";
    return await orders.save();
}

const findorderbyid = async (orderid) => {
    // ✅ fixed: orderitems -> orderitem to match model field
    const orders = await order.findById(orderid)
        .populate("user")
        .populate({ path: "orderitem", populate: { path: "product" } })
        .populate("shippingaddress");
    return orders;
}

const userorderhistory = async (userid) => {
    try {
        // ✅ fixed: renamed result variable to avoid conflict with model name
        const orders = await order.find({ user: userid, orderstatus: "PLACED" })
            .populate({ path: "orderitem", populate: { path: "product" } })
            .lean();
        return orders;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getallorder = async () => {
    // ✅ fixed: orderitems -> orderitem
    return await order.find()
        .populate({ path: "orderitem", populate: { path: "product" } })
        .lean();
}

const removeorder = async (orderid) => {
    const orders = await findorderbyid(orderid);
    // ✅ fixed: findByIdandDelete -> findByIdAndDelete (capital A and D)
    await order.findByIdAndDelete(orders._id);
}

const shiporder = async (orderid) => {
    const orders = await findorderbyid(orderid);
    orders.orderstatus = "SHIPPED";
    return orders.save();
}

module.exports = {
    getallorder,
    shiporder,
    userorderhistory,
    removeorder,
    findorderbyid,
    cancelorder,
    placeorder,
    deliverorder,
    confirmedorder,
    createorder,
}