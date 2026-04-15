const reviews = require("../models/reviews.model");
const { findproductbyid } = require("./product.service")

const createreview=async(reqdata,user)=>{
    const product=await findproductbyid(reqdata.productid);
    const review=new reviews({
        user:user._id,
        product:product._id,
        reviews:reqdata.review,
        createdat:new Date(),
    })
    await product.save();
    return await review.save();
}
const getallreview=async(productid)=>{
    const reviews=await findproductbyid(productid);
    return await reviews.find({product:productid}).populate("user");
}
module.exports={
    getallreview,
    createreview
}