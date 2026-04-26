// const { createreview, getallreview } =require("../services/review.service");

// // const { createreview } = ;

// // const createreviews = async (req, res) => {
// //     try {
// //         const reviews=await createreview(req.body,req.user);
// //         res.status(201).send({reviews:reviews});
// //     } catch (error) {
// //         res.status(501).send({message:error.message});
// //     }
// // }
// // const getallreviews=async(req,res)=>{
// //     try {
// //         const reviews = await getallreview(req.params.productid);
// //         res.status(200).send({ reviews });
// //     } catch (error) {
// //         res.status(500).send({ message: error.message });
// //     }
// // };
// // module.exports={
// //     getallreviews,
// //     createreviews
// // }
// // const { createreview, getallreview, deletereview } = require("../services/Review.sevices");
// // const { createreview, getallreview, deletereview } = require("../services/review.services"); // ✅ fixed typo

// const createreviews = async (req, res) => {
//     try {
//         const review = await createreview(req.body, req.user);
//         res.status(201).send({ review });  // ✅ singular 'review' so frontend gets review not reviews
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// };

// const getallreviews = async (req, res) => {
//     try {
//         const reviews = await getallreview(req.params.productid);
//         res.status(200).send({ reviews });
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// };

// // const deletereviews = async (req, res) => {
// //     try {
// //         const message = await deletereview(req.params.reviewid, req.user);
// //         res.status(200).send({ message });
// //     } catch (error) {
// //         res.status(500).send({ message: error.message });
// //     }
// // };
// const deletereviews = async (req, res) => {
//     try {
//         console.log("delete review id:", req.params.reviewid);
//         console.log("user:", req.user);
//         const message = await deletereview(req.params.reviewid, req.user);
//         res.status(200).send({ message });
//     } catch (error) {
//         console.log("delete review error:", error.message); // ✅ see exact error
//         res.status(500).send({ message: error.message });
//     }
// };

// module.exports = {
//     getallreviews,
//     createreviews,
//     deletereviews,
// };
const { createreview, getallreview, deletereview } = require("../services/review.service"); // ✅ added deletereview

const createreviews = async (req, res) => {
    try {
        const review = await createreview(req.body, req.user);
        res.status(201).send({ review });
    } catch (error) {
        console.log("create review error:", error.message);
        res.status(500).send({ message: error.message });
    }
};

const getallreviews = async (req, res) => {
    try {
        const reviews = await getallreview(req.params.productid);
        res.status(200).send({ reviews });
    } catch (error) {
        console.log("get reviews error:", error.message);
        res.status(500).send({ message: error.message });
    }
};

const deletereviews = async (req, res) => {
    try {
        console.log("delete review id:", req.params.reviewid);
        console.log("user:", req.user);
        const message = await deletereview(req.params.reviewid, req.user); // ✅ now defined
        res.status(200).send({ message });
    } catch (error) {
        console.log("delete review error:", error.message);
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    getallreviews,
    createreviews,
    deletereviews,
};