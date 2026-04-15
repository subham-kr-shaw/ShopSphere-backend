const rating = require("../models/ratings")
const { findproductbyid } = require("./product.service")

const createrating=async(req,user)=>{
    const product=await findproductbyid(req.productid);
    const ratings=new rating({
        user:user._id,
        product:product._id,
        rating:req.rating,
        createdat:new Date(),
    })
    await product.save();
    return await ratings.save();
}


const getallrating=async(productid)=>{
    return await rating.find({product:productid})
}

module.exports={
    getallrating,
    createrating,
}
