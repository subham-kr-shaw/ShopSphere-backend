// const reviews = require("../models/reviews.model");
// const { findproductbyid } = require("./product.service");


// async function createreview(reqData,user){
//     const product=await findproductbyid(reqData.productId);

//     const review=new reviews({
//         user:user._id,
//         product:product._id,
//         review:reqData.review,
//         createdAt:new Date(),
//     })

//     await product.save();
//     return await review.save();
// }

// async function getallreivew(productId){

//     const product=await findproductbyid(reqData.productId);

//     return await Review.find({product:productId}).populate("user");

// }

// module.exports={
//     createreview,
//     getallreivew,}
// const reviews = require("../models/reviews.model");
// const { findproductbyid } = require("./product.service");

// const createreview = async (reqdata, user) => {
//     const product = await findproductbyid(reqdata.productid);

//     const review = new reviews({
//         user: user._id,
//         product: product._id,
//         reviews: reqdata.review,
//         createdat: new Date(),
//     });

//     const savedreview = await review.save();

//     // ✅ push review ref into product
//     product.reviews.push(savedreview._id);
//     await product.save();

//     // ✅ populate user before returning so frontend gets full data
//     return await savedreview.populate("user");
// };

// const getallreview = async (productid) => {
//     // ✅ fixed: query reviews collection directly
//     return await reviews.find({ product: productid }).populate("user");
// };

// const deletereview = async (reviewid, user) => {
//     const review = await reviews.findById(reviewid);
//     if (!review) throw new Error("Review not found");
//     if (review.user.toString() !== user._id.toString()) {
//         throw new Error("Unauthorized to delete this review");
//     }
//     await reviews.findByIdAndDelete(reviewid);
//     return "Review deleted successfully";
// };

// module.exports = {
//     getallreview,
//     createreview,
//     deletereview,
// };
// const reviews = require("../models/reviews.model");
// const { findproductbyid } = require("./product.service");

// const createreview = async (reqdata, user) => {
//     const prod = await findproductbyid(reqdata.productid);

//     const review = new reviews({
//         user: user._id,
//         product: prod._id,
//         reviews: reqdata.review,
//         createdat: new Date(),
//     });

//     const savedreview = await review.save();

//     // ✅ push and save product
//     prod.reviews.push(savedreview._id);
//     await prod.save();

//     return await reviews.findById(savedreview._id)
//         .populate("user", "firstname lastname email");
// };

// const getallreview = async (productid) => {
//     return await reviews.find({ product: productid })
//         .populate("user", "firstname lastname email")
//         .sort({ createdat: -1 });
// };

// const deletereview = async (reviewid, user) => {
//     const review = await reviews.findById(reviewid);
//     if (!review) throw new Error("Review not found");
//     if (review.user.toString() !== user._id.toString()) {
//         throw new Error("Unauthorized to delete this review");
//     }
//     await reviews.findByIdAndDelete(reviewid);
//     return "Review deleted successfully";
// };

// module.exports = {
//     getallreview,
//     createreview,
//     deletereview,
// };
// const reviews = require("../models/reviews.model");
// const { findproductbyid } = require("./product.service");

// const createreview = async (reqdata, user) => {
//     const prod = await findproductbyid(reqdata.productid);

//     const review = new reviews({
//         user: user._id,
//         product: prod._id,
//         reviews: reqdata.review,
//         createdat: new Date(),
//     });

//     const savedreview = await review.save();

//     // ✅ push and save product
//     prod.reviews.push(savedreview._id);
//     await prod.save();

//     return await reviews.findById(savedreview._id)
//         .populate("user", "firstname lastname email");
// };

// const getallreview = async (productid) => {
//     return await reviews.find({ product: productid })
//         .populate("user", "firstname lastname email")
//         .sort({ createdat: -1 });
// };

// const deletereview = async (reviewid, user) => {
//     const review = await reviews.findById(reviewid);
//     if (!review) throw new Error("Review not found");
//     if (review.user.toString() !== user._id.toString()) {
//         throw new Error("Unauthorized to delete this review");
//     }
//     await reviews.findByIdAndDelete(reviewid);
//     return "Review deleted successfully";
// };

// module.exports = {
//     getallreview,
//     createreview,
//     deletereview,
// };
// const reviews = require("../models/reviews.model");
// const product = require("../models/product.model");
// const { findproductbyid } = require("./product.service");

// // const createreview = async (reqdata, user) => {

// //     const prod = await findproductbyid(reqdata.productid);

// //     const review = new reviews({
// //         user: user._id,
// //         product: prod._id,
// //         reviews: reqdata.review,
// //         createdat: new Date(),
// //     });

// //     const savedreview = await review.save();
// //     prod.reviews.push(savedreview._id);
// //     await prod.save();

// //     return await reviews.findById(savedreview._id)
// //         .populate("user", "firstname lastname email");
// // };
// const createreview = async (reqdata, user) => {
//     const prod = await findproductbyid(reqdata.productid);

//     // ✅ check if user already reviewed this product
//     const existingreview = await reviews.findOne({
//         user: user._id,
//         product: prod._id
//     });

//     if (existingreview) {
//         // ✅ update existing review instead of creating duplicate
//         existingreview.reviews = reqdata.review;
//         existingreview.createdat = new Date();
//         await existingreview.save();
//         return await reviews.findById(existingreview._id)
//             .populate("user", "firstname lastname email");
//     }

//     const review = new reviews({
//         user: user._id,
//         product: prod._id,
//         reviews: reqdata.review,
//         createdat: new Date(),
//     });

//     const savedreview = await review.save();
//     prod.reviews.push(savedreview._id);
//     await prod.save();

//     return await reviews.findById(savedreview._id)
//         .populate("user", "firstname lastname email");
// };

// const getallreview = async (productid) => {
//     return await reviews.find({ product: productid })
//         .populate("user", "firstname lastname email")
//         .sort({ createdat: -1 });
// };

// // const deletereview = async (reviewid, user) => {
// //     const review = await reviews.findById(reviewid);
// //     if (!review) throw new Error("Review not found");
// //     if (review.user.toString() !== user._id.toString()) {
// //         throw new Error("Unauthorized to delete this review");
// //     }

// //     const productid = review.product;
// //     await reviews.findByIdAndDelete(reviewid);

// //     // ✅ remove from product reviews array
// //     await product.findByIdAndUpdate(productid, {
// //         $pull: { reviews: reviewid }
// //     });

// //     return "Review deleted successfully";
// // };
// const deletereview = async (reviewid, user) => {
//     const review = await reviews.findById(reviewid);
//     if (!review) throw new Error("Review not found");
    
//     // ✅ convert both to string properly for comparison
//     if (review.user.toString() !== user._id.toString()) {
//         throw new Error("Unauthorized to delete this review");
//     }

//     const productid = review.product;

//     await reviews.findByIdAndDelete(reviewid);

//     // ✅ remove ref from product
//     await product.findByIdAndUpdate(productid, {
//         $pull: { reviews: review._id }
//     });

//     return "Review deleted successfully";
// };
// module.exports = {
//     getallreview,
//     createreview,
//     deletereview,
// };
const reviews = require("../models/reviews.model");
const product = require("../models/product.model");
const { findproductbyid } = require("./product.service");
const mongoose = require("mongoose");

const createreview = async (reqdata, user) => {
    const prod = await findproductbyid(reqdata.productid);

    // ✅ use mongoose ObjectId for reliable comparison
    const existingreview = await reviews.findOne({
        user: new mongoose.Types.ObjectId(user._id),
        product: new mongoose.Types.ObjectId(prod._id)
    });

    if (existingreview) {
        // ✅ update text only, don't create new
        existingreview.reviews = reqdata.review;
        existingreview.createdat = new Date();
        await existingreview.save();
        return await reviews.findById(existingreview._id)
            .populate("user", "firstname lastname email");
    }

    // ✅ create new only if no existing review
    const review = new reviews({
        user: user._id,
        product: prod._id,
        reviews: reqdata.review,
        createdat: new Date(),
    });

    const savedreview = await review.save();

    // ✅ only push if not already in array
    await product.findByIdAndUpdate(prod._id, {
        $addToSet: { reviews: savedreview._id }  // $addToSet prevents duplicates
    });

    return await reviews.findById(savedreview._id)
        .populate("user", "firstname lastname email");
};

const getallreview = async (productid) => {
    return await reviews.find({ product: productid })
        .populate("user", "firstname lastname email")
        .sort({ createdat: -1 });
};

const deletereview = async (reviewid, user) => {
    const review = await reviews.findById(reviewid);
    if (!review) throw new Error("Review not found");
    if (review.user.toString() !== user._id.toString()) {
        throw new Error("Unauthorized to delete this review");
    }
    const productid = review.product;
    await reviews.findByIdAndDelete(reviewid);
    await product.findByIdAndUpdate(productid, {
        $pull: { reviews: review._id }
    });
    return "Review deleted successfully";
};

module.exports = {
    getallreview,
    createreview,
    deletereview,
};