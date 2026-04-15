const { createorder, findorderbyid, userorderhistory } = require("../services/order.service");

const createorders=async(req,res)=>{
    try {
        const user=await req.user;
        const order=await createorder(req.body,user);
        return res.status(500).send({order});
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
}

const findorderbyids=async(req,res)=>{
    try {
      const user=req.user;
      let order=await findorderbyid(req.params.orderid);
        return res.status(500).send({order:order});
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
}

const orderhistory=async(req,res)=>{
    try {
      const user=req.user;
      let order=await userorderhistory(req.params.id);
        return res.status(500).send({order:order});
    } catch (error) {
        return res.status(500).send({message:error.message});
    }

}

module.exports={
    findorderbyids,
    orderhistory,
    createorders
}