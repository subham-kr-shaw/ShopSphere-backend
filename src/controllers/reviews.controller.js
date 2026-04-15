const { createreview, getallreview } = require("../services/Review.sevices");

const createreviews = async (req, res) => {
    try {
        const reviews=await createreview(req.body,req.user);
        res.status(201).send({reviews:reviews});
    } catch (error) {
        res.status(501).send({message:error.message});
    }
}
const getallreviews=async(req,res)=>{
    try {
        const reviews = await getallreview(req.params.productid);
        res.status(200).send({ reviews });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
module.exports={
    getallreviews,
    createreviews
}