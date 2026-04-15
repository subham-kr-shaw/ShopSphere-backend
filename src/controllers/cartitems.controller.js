const { updatecartitems, removecartitem } = require("../services/cartitem.services");

const updatecartitem = async (req, res) => {
    try {
        const user = req.user;
        const cartitems = await updatecartitems(user._id, req.params.id, req.body);
        return res.status(200).send({ cartitems });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

const removecartitems = async (req, res) => {
    try {
        const user = req.user;
        const cartitem = await removecartitem(user._id, req.params.id);
        return res.status(200).send({ message: "succesfully remove cartitem" });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

module.exports = {
    removecartitems,
    updatecartitem,
};