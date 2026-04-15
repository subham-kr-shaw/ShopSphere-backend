const { findusercart, additemcart } = require("../services/cart.service");

const findusercarts=async(req,res)=>{
 try {
    const user=req.user;
    const cart=await findusercart(user._id);
    return res.status(200).send({ cart });
 } catch (error) {
    return res.status(500).send({ message: error.message });
 }
}

const additemtocart=async(req,res)=>{
  try {
   const user=req.user;
   const cart=await additemcart(user._id,req);
   return res.status(200).send({message:cart});
  } catch (error) {
     return res.status(500).send({ message: error.message });
  }
}
module.exports={
   additemtocart,
   findusercarts,
}