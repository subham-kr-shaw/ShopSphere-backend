const reviews = require("../models/reviews.model");
const { findproductbyid } = require("./product.service");


async function createreview(reqData,user){
    const product=await findproductbyid(reqData.productId);

    const review=new reviews({
        user:user._id,
        product:product._id,
        review:reqData.review,
        createdAt:new Date(),
    })

    await product.save();
    return await review.save();
}

async function getallreivew(productId){

    const product=await findproductbyid(reqData.productId);

    return await Review.find({product:productId}).populate("user");

}

module.exports={
    createreview,
    getallreivew,}