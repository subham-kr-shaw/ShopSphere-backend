const { createrating, getallrating } = require("../services/rating.service");

const createratings = async (req, res) => {
    try {
        const ratings = await createrating(req.body, req.user);
        res.status(201).send({ ratings });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getallratings = async (req, res) => {
    try {
        const ratings = await getallrating(req.params.productid);
        res.status(200).send({ ratings });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    getallratings,
    createratings,
};