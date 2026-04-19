// const { createorder, findorderbyid, userorderhistory } = require("../services/order.service");

// // const createorders=async(req,res)=>{
// //     try {
// //         const user=await req.user;
// //         const order=await createorder(req.body,user);
// //         return res.status(500).send({order});
// //     } catch (error) {
// //         return res.status(500).send({message:error.message});
// //     }
// // }
// const createorders = async (req, res) => {
//     try {
//         const user = req.user;
//         const order = await createorder(req.body, user);
//         // ✅ was 500 — changed to 201 Created
//         return res.status(201).send({ order });
//     } catch (error) {
//         return res.status(500).send({ message: error.message });
//     }
// }

// const findorderbyids=async(req,res)=>{
//     try {
//       const user=req.user;
//       let order=await findorderbyid(req.params.orderid);
//         return res.status(500).send({order:order});
//     } catch (error) {
//         return res.status(500).send({message:error.message});
//     }
// }

// const orderhistory=async(req,res)=>{
//     try {
//       const user=req.user;
//       let order=await userorderhistory(req.params.id);
//         return res.status(500).send({order:order});
//     } catch (error) {
//         return res.status(500).send({message:error.message});
//     }

// }

// module.exports={
//     findorderbyids,
//     orderhistory,
//     createorders
// }
// const { createorder, findorderbyid, userorderhistory } = require("../services/order.service");

// const createorders = async (req, res) => {
//     try {
//         const user = req.user;
//         const order = await createorder(req.body, user);
//         return res.status(201).send({ order }); // ✅ 201 Created
//     } catch (error) {
//         return res.status(500).send({ message: error.message });
//     }
// }

// const findorderbyids = async (req, res) => {
//     try {
//         const user = req.user;
//         // ✅ fixed: req.params.id not req.params.orderid
//         const order = await findorderbyid(req.params.id);
//         return res.status(200).send({ order }); // ✅ 200 not 500
//     } catch (error) {
//         return res.status(500).send({ message: error.message });
//     }
// }

// const orderhistory = async (req, res) => {
//     try {
//         const user = req.user;
//         // ✅ fixed: pass user._id not req.params.id
//         const orders = await userorderhistory(user._id);
//         return res.status(200).send({ orders }); // ✅ 200 not 500
//     } catch (error) {
//         return res.status(500).send({ message: error.message });
//     }
// }

// module.exports = {
//     findorderbyids,
//     orderhistory,
//     createorders
// }
const { createorder, findorderbyid, userorderhistory } = require("../services/order.service");

const createorders = async (req, res) => {
    try {
        const user = req.user;
        console.log("req.body:", req.body);
        console.log("user:", user);
        const order = await createorder(req.body, user);
        return res.status(201).send({ order });
    } catch (error) {
        console.log("ORDER ERROR:", error.message);
        return res.status(500).send({ message: error.message });
    }
}

const findorderbyids = async (req, res) => {
    try {
        const order = await findorderbyid(req.params.id);
        return res.status(200).send({ order });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

const orderhistory = async (req, res) => {
    try {
        const user = req.user;
        const orders = await userorderhistory(user._id);
        return res.status(200).send({ orders });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

module.exports = {
    createorders,
    findorderbyids,
    orderhistory,
}