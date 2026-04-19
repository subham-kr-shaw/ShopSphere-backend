// const CartItem = require("../models/cartitems.model");
// const { findbyid } = require("./user.service");

// const findcartitembyid = async (cartitemid) => {
//   try {
//     const cartitem = await CartItem.findById(cartitemid).populate('product');
//     if (cartitem) return cartitem;
//     throw new Error("cartitem do not exist!");
//   }
//   catch (error) {
//     throw new Error(error.message);
//   }
// }

// const updatecartitems = async (userid, cartitemid, cartitemdata) => {
//   try {
//     const items = await findcartitembyid(cartitemid);
//     if (!items) {
//       throw new Error("cart item not found !")
//     }
//     const user = await findbyid(items.userid);
//     if (!user) throw new Error("user not found !");
//     if (userid.toString() === user.id.toString()) {
//       console.log(cartitemdata.quantity);
//       items.quantity = cartitemdata.quantity;
//       items.price = items.product.price * items.quantity;
//       items.discountedprice = items.product.discountedprice * items.quantity;
//       const updatecart = await items.save();
//       return updatecart;
//     }
//   }
//   catch (error) {
//     throw new Error(error.message);
//   }
// }

// // const removecartitem = async (userid, cartitemid) => {
// //   const cartitem = await findcartitembyid(cartitemid);
// //   if (!cartitem) throw new Error("item not found");

// //   const user = await findbyid(userid);
// //   if (!user) throw new Error("user do not exist");
  
// //   if (user._id.toString() == userid.toString()) {
// //     return await CartItem.findByIdAndDelete(cartitemid);
// //   }
// //   throw new Error("u cant remove another user cartitems");
// // }
// const removecartitem = async (userid, cartitemid) => {
//   try {
//     const cartitem = await CartItem.findById(cartitemid);
//     if (!cartitem) throw new Error("item not found");

//     if (cartitem.userid.toString() !== userid.toString()) {
//       throw new Error("you can't remove another user's cart item");
//     }

//     const cartid = cartitem.cart; // ✅ save before deleting

//     // ✅ Delete the cartitem document
//     await CartItem.findByIdAndDelete(cartitemid);

//     // ✅ Pull the ID reference from Cart's cartitems array
//     await cart.findOneAndUpdate(
//       { _id: cartid }, // ✅ use cartid directly, more reliable than userid lookup
//       { $pull: { cartitems: cartitem._id } }
//     );

//     return "item removed successfully";
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }
// // const removecartitem = async (userid, cartitemid) => {
// //     try {
// //         // 1. Check cartitem exists and belongs to this user
// //         const cartitem = await CartItem.findById(cartitemid);
// //         if (!cartitem) throw new Error("item not found");

// //         if (cartitem.userid.toString() !== userid.toString()) {
// //             throw new Error("you can't remove another user's cart item");
// //         }

// //         // 2. Delete the cartitem document
// //         await CartItem.findByIdAndDelete(cartitemid);

// //         // 3. ✅ Remove _id reference from cart array
// //         await cart.findOneAndUpdate(
// //             { user: userid },
// //             { $pull: { cartitems: cartitemid } }
// //         );

// //         return "item removed successfully";
// //     } catch (error) {
// //         throw new Error(error.message);
// //     }
// // }

// module.exports = {
//   updatecartitems,
//   removecartitem,
//   findcartitembyid,
// }

const mongoose = require("mongoose");
const CartItem = require("../models/cartitems.model");
const Cart = require("../models/cart.model"); // ✅ THIS WAS MISSING
const { findbyid } = require("./user.service");

const findcartitembyid = async (cartitemid) => {
  try {
    const cartitem = await CartItem.findById(cartitemid).populate('product');
    if (cartitem) return cartitem;
    throw new Error("cartitem do not exist!");
  } catch (error) {
    throw new Error(error.message);
  }
}

const updatecartitems = async (userid, cartitemid, cartitemdata) => {
  try {
    const items = await findcartitembyid(cartitemid);
    if (!items) throw new Error("cart item not found!");

    const user = await findbyid(items.userid);
    if (!user) throw new Error("user not found!");

    if (userid.toString() === user.id.toString()) {
      items.quantity = cartitemdata.quantity;
      items.price = items.product.price * items.quantity;
      items.discountedprice = items.product.discountedprice * items.quantity;
      const updatecart = await items.save();
      return updatecart;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

const removecartitem = async (userid, cartitemid) => {
  try {
    const cartitem = await CartItem.findById(cartitemid);
    if (!cartitem) throw new Error("item not found");

    if (cartitem.userid.toString() !== userid.toString()) {
      throw new Error("you can't remove another user's cart item");
    }

    const cartid = cartitem.cart; // save before deleting

    // Delete the cartitem document
    await CartItem.findByIdAndDelete(cartitemid);

    // ✅ Pull using Capital Cart model + ObjectId wrapper
    await Cart.findByIdAndUpdate(
      cartid,
      { $pull: { cartitems: new mongoose.Types.ObjectId(cartitemid) } }
    );

    return "item removed successfully";
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  updatecartitems,
  removecartitem,
  findcartitembyid,
}