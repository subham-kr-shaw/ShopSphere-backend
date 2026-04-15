const { getallorder, confirmedorder, shiporder, findorderbyid, deliverorder, cancelorder, removeorder } = require("../services/order.service");
const { getallproduct } = require("../services/product.service");

const getallorders = async (req, res) => {
    try {
        const orders = await getallorder();
        return res.status(200).send({ orders });
    }
    catch (error) {
        throw new Error({ message: error.message });
    }
}
const confirmedorders = async (req, res) => {
    try {
        const orderid = req.params.orderid;
        const product = await confirmedorder(orderid);
        return res.status(200).send({ product: product })
    }
    catch (error) {
        throw new Error({ message: error.message });
    }
}

const shiporders = async (req, res) => {
    try {
        const orderid = req.params.orderid;
        const order = await shiporder(orderid);
        return res.status(200).send({ order: order })
    }
    catch (error) {
        throw new Error({ message: error.message });

    }
}

const deliverorders = async (req, res) => {
    try {
        const orderid = req.params.orderid;
        const order = await deliverorder(orderid);
        return res.status(200).send({ order: order });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}
const cancellorder = async (req, res) => {
    try {
        const orderid = req.params.orderid;
        const order = await cancelorder(orderid);
        return res.status(200).send({ order: order });
    }
    catch(error){
        return res.status(500).send({ order:error.message});
    }
    
}
const deleteorders = async (req, res) => {
    try {
        const orderid = req.params.orderid;
        const order = await removeorder(orderid);
        return res.status(200).send({ order: order });
    }
    catch(error){
        return res.status(500).send({ order:error.message});
    }
    
}

module.exports={
    deleteorders,
    cancellorder,
    deliverorders,
    getallorders,
    shiporders,
    confirmedorders,
}