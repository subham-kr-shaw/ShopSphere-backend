const CartItem = require("../models/cartitems.model");
const { findbyid } = require("./user.service");

const findcartitembyid = async (cartitemid) => {
  try {
    const cartitem = await CartItem.findById(cartitemid).populate('product');
    if (cartitem) return cartitem;
    throw new Error("cartitem do not exist!");
  }
  catch (error) {
    throw new Error(error.message);
  }
}

const updatecartitems = async (userid, cartitemid, cartitemdata) => {
  try {
    const items = await findcartitembyid(cartitemid);
    // console.log(items);
    if (!items) {
      throw new Error("cart item not found !")
    }
    const user = await findbyid(items.userid);
    if (!user) throw new Error("user not found !");
    if (userid.toString() === user.id.toString()) {
      console.log(cartitemdata.quantity);
      items.quantity = cartitemdata.quantity;
      items.price = items.product.price * items.quantity;
      items.discountedprice = items.product.discountedprice * items.quantity;
      const updatecart = await items.save();
      return updatecart;
    }
  }
  catch (error) {
    throw new Error(error.message);
  }
}
 

const removecartitem = async (userid, cartitemid) => {
  const cartitem = await findcartitembyid(cartitemid);
  if (!cartitem) throw new Error("item not found");

  const user = await findbyid(userid);
  if (!user) throw new Error("user do not exist");
  
  if (user._id.toString() == userid.toString()) {
    return await CartItem.findByIdAndDelete(cartitemid);
  }
  throw new Error("u cant remove another user cartitems");
}

module.exports = {
  updatecartitems,
  removecartitem,
  findcartitembyid,
}