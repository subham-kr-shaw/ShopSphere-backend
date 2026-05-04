
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