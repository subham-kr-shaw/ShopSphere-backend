// const rating = require("../models/ratings")
// const { findproductbyid } = require("./product.service")

// const createrating=async(req,user)=>{
//     const product=await findproductbyid(req.productid);
//     const ratings=new rating({
//         user:user._id,
//         product:product._id,
//         rating:req.rating,
//         createdat:new Date(),
//     })
//     await product.save();
//     return await ratings.save();
// }


// const getallrating=async(productid)=>{
//     return await rating.find({product:productid})
// }

// module.exports={
//     getallrating,
//     createrating,
// }
// const rating = require("../models/ratings");
// const { findproductbyid } = require("./product.service");

// const createrating = async (req, user) => {
//     const product = await findproductbyid(req.productid);

//     // ✅ Check if user already rated this product
//     const existingrating = await rating.findOne({
//         user: user._id,
//         product: product._id
//     });

//     if (existingrating) {
//         // ✅ Update existing rating instead of creating duplicate
//         existingrating.rating = req.rating;
//         return await existingrating.save();
//     }

//     const newrating = new rating({
//         user: user._id,
//         product: product._id,
//         rating: req.rating,
//         createdat: new Date(),
//     });

//     const savedrating = await newrating.save();

//     // ✅ Push rating ref into product and save
//     product.ratings.push(savedrating._id);
//     await product.save();

//     return savedrating;
// };

// const getallrating = async (productid) => {
//     return await rating.find({ product: productid }).populate("user");
// };

// const deleterating = async (ratingid, user) => {
//     const existingrating = await rating.findById(ratingid);
//     if (!existingrating) throw new Error("Rating not found");

//     // ✅ Only owner can delete
//     if (existingrating.user.toString() !== user._id.toString()) {
//         throw new Error("Unauthorized to delete this rating");
//     }

//     await rating.findByIdAndDelete(ratingid);
//     return "Rating deleted successfully";
// };

// module.exports = {
//     getallrating,
//     createrating,
//     deleterating,
// };
// const rating = require("../models/ratings");
// const { findproductbyid } = require("./product.service");
// const product = require("../models/product.model");

// const createrating = async (req, user) => {
//     const prod = await findproductbyid(req.productid);

//     const existingrating = await rating.findOne({
//         user: user._id,
//         product: prod._id
//     });

//     if (existingrating) {
//         existingrating.rating = req.rating;
//         await existingrating.save();

//         // ✅ recalculate average and update product
//         await updateproductrating(prod._id);

//         return await rating.findById(existingrating._id).populate("user", "firstname lastname email");
//     }

//     const newrating = new rating({
//         user: user._id,
//         product: prod._id,
//         rating: req.rating,
//         createdat: new Date(),
//     });

//     const savedrating = await newrating.save();

//     prod.ratings.push(savedrating._id);
//     await prod.save();

//     // ✅ recalculate average and update product
//     await updateproductrating(prod._id);

//     return await rating.findById(savedrating._id).populate("user", "firstname lastname email");
// };

// // ✅ helper to recalculate and save average rating on product
// const updateproductrating = async (productid) => {
//     const allratings = await rating.find({ product: productid });
//     if (allratings.length === 0) return;

//     const average = allratings.reduce((sum, r) => sum + r.rating, 0) / allratings.length;

//     await product.findByIdAndUpdate(productid, {
//         numratings: parseFloat(average.toFixed(1))
//     });
// };

// const getallrating = async (productid) => {
//     return await rating.find({ product: productid })
//         .populate("user", "firstname lastname email");
// };

// const deleterating = async (ratingid, user) => {
//     const existingrating = await rating.findById(ratingid);
//     if (!existingrating) throw new Error("Rating not found");
//     if (existingrating.user.toString() !== user._id.toString()) {
//         throw new Error("Unauthorized to delete this rating");
//     }

//     const productid = existingrating.product;
//     await rating.findByIdAndDelete(ratingid);

//     // ✅ recalculate after delete too
//     await updateproductrating(productid);

//     return "Rating deleted successfully";
// };

// module.exports = {
//     getallrating,
//     createrating,
//     deleterating,
// };
// const rating = require("../models/ratings");
// const { findproductbyid } = require("./product.service");
// const product = require("../models/product.model");

// const createrating = async (req, user) => {
//     const prod = await findproductbyid(req.productid);

//     const existingrating = await rating.findOne({
//         user: user._id,
//         product: prod._id
//     });

//     if (existingrating) {
//         existingrating.rating = req.rating;
//         await existingrating.save();

//         // ✅ recalculate average and update product
//         await updateproductrating(prod._id);

//         return await rating.findById(existingrating._id).populate("user", "firstname lastname email");
//     }

//     const newrating = new rating({
//         user: user._id,
//         product: prod._id,
//         rating: req.rating,
//         createdat: new Date(),
//     });

//     const savedrating = await newrating.save();

//     prod.ratings.push(savedrating._id);
//     await prod.save();

//     // ✅ recalculate average and update product
//     await updateproductrating(prod._id);

//     return await rating.findById(savedrating._id).populate("user", "firstname lastname email");
// };

// // ✅ helper to recalculate and save average rating on product
// const updateproductrating = async (productid) => {
//     const allratings = await rating.find({ product: productid });
//     if (allratings.length === 0) return;

//     const average = allratings.reduce((sum, r) => sum + r.rating, 0) / allratings.length;

//     await product.findByIdAndUpdate(productid, {
//         numratings: parseFloat(average.toFixed(1))
//     });
// };

// const getallrating = async (productid) => {
//     return await rating.find({ product: productid })
//         .populate("user", "firstname lastname email");
// };

// const deleterating = async (ratingid, user) => {
//     const existingrating = await rating.findById(ratingid);
//     if (!existingrating) throw new Error("Rating not found");
//     if (existingrating.user.toString() !== user._id.toString()) {
//         throw new Error("Unauthorized to delete this rating");
//     }

//     const productid = existingrating.product;
//     await rating.findByIdAndDelete(ratingid);

//     // ✅ recalculate after delete too
//     await updateproductrating(productid);

//     return "Rating deleted successfully";
// };

// module.exports = {
//     getallrating,
//     createrating,
//     deleterating,
// };
// const rating = require("../models/ratings");
// const product = require("../models/product.model");
// const { findproductbyid } = require("./product.service");

// const updateproductrating = async (productid) => {
//     const allratings = await rating.find({ product: productid });
//     const average = allratings.length > 0
//         ? parseFloat((allratings.reduce((sum, r) => sum + r.rating, 0) / allratings.length).toFixed(1))
//         : 0;
//     await product.findByIdAndUpdate(productid, { numratings: average });
// };

// const createrating = async (req, user) => {
//     const prod = await findproductbyid(req.productid);

//     const existingrating = await rating.findOne({
//         user: user._id,
//         product: prod._id
//     });

//     if (existingrating) {
//         existingrating.rating = req.rating;
//         await existingrating.save();
//         await updateproductrating(prod._id);
//         return await rating.findById(existingrating._id).populate("user", "firstname lastname email");
//     }

//     const newrating = new rating({
//         user: user._id,
//         product: prod._id,
//         rating: req.rating,
//         createdat: new Date(),
//     });

//     const savedrating = await newrating.save();
//     prod.ratings.push(savedrating._id);
//     await prod.save();
//     await updateproductrating(prod._id);

//     return await rating.findById(savedrating._id).populate("user", "firstname lastname email");
// };

// const getallrating = async (productid) => {
//     return await rating.find({ product: productid })
//         .populate("user", "firstname lastname email");
// };

// const deleterating = async (ratingid, user) => {
//     const existingrating = await rating.findById(ratingid);
//     if (!existingrating) throw new Error("Rating not found");
//     if (existingrating.user.toString() !== user._id.toString()) {
//         throw new Error("Unauthorized to delete this rating");
//     }
//     const productid = existingrating.product;
//     await rating.findByIdAndDelete(ratingid);

//     // ✅ remove from product ratings array
//     await product.findByIdAndUpdate(productid, {
//         $pull: { ratings: ratingid }
//     });

//     // ✅ recalculate average after delete
//     await updateproductrating(productid);

//     return "Rating deleted successfully";
// };

// module.exports = {
//     getallrating,
//     createrating,
//     deleterating,
// };
const rating = require("../models/ratings");
const product = require("../models/product.model");
const { findproductbyid } = require("./product.service");
const mongoose = require("mongoose");

const updateproductrating = async (productid) => {
    const allratings = await rating.find({ product: productid });
    const average = allratings.length > 0
        ? parseFloat((allratings.reduce((sum, r) => sum + r.rating, 0) / allratings.length).toFixed(1))
        : 0;
    await product.findByIdAndUpdate(productid, { numratings: average });
};

const createrating = async (req, user) => {
    const prod = await findproductbyid(req.productid);

    // ✅ reliable ObjectId comparison
    const existingrating = await rating.findOne({
        user: new mongoose.Types.ObjectId(user._id),
        product: new mongoose.Types.ObjectId(prod._id)
    });

    if (existingrating) {
        existingrating.rating = req.rating;
        await existingrating.save();
        await updateproductrating(prod._id);
        return await rating.findById(existingrating._id)
            .populate("user", "firstname lastname email");
    }

    const newrating = new rating({
        user: user._id,
        product: prod._id,
        rating: req.rating,
        createdat: new Date(),
    });

    const savedrating = await newrating.save();

    // ✅ $addToSet prevents duplicate refs in product
    await product.findByIdAndUpdate(prod._id, {
        $addToSet: { ratings: savedrating._id }
    });

    await updateproductrating(prod._id);

    return await rating.findById(savedrating._id)
        .populate("user", "firstname lastname email");
};

const getallrating = async (productid) => {
    return await rating.find({ product: productid })
        .populate("user", "firstname lastname email");
};

const deleterating = async (ratingid, user) => {
    const existingrating = await rating.findById(ratingid);
    if (!existingrating) throw new Error("Rating not found");
    if (existingrating.user.toString() !== user._id.toString()) {
        throw new Error("Unauthorized to delete this rating");
    }
    const productid = existingrating.product;
    await rating.findByIdAndDelete(ratingid);
    await product.findByIdAndUpdate(productid, {
        $pull: { ratings: ratingid }
    });
    await updateproductrating(productid);
    return "Rating deleted successfully";
};

module.exports = {
    getallrating,
    createrating,
    deleterating,
};