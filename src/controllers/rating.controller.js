// const { createrating, getallrating } = require("../services/rating.service");

// const createratings = async (req, res) => {
//     try {
//         const ratings = await createrating(req.body, req.user);
//         res.status(201).send({ ratings });
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// };

// const getallratings = async (req, res) => {
//     try {
//         const ratings = await getallrating(req.params.productid);
//         res.status(200).send({ ratings });
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// };

// module.exports = {
//     getallratings,
//     createratings,
// };
const { createrating, getallrating, deleterating } = require("../services/rating.service");

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

const deleteratings = async (req, res) => {
    try {
        const message = await deleterating(req.params.ratingid, req.user);
        res.status(200).send({ message });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    getallratings,
    createratings,
    deleteratings,
};