const { getuserprofilebytoken, getuser } = require("../services/user.service");

const getuserproflie=async(req,res)=>{
    try{
        const token=req.headers.authorization?.split(" ")[1];
        if(!token)return  res.status(500).send({ message: "token is not accessiable"});
        const user=await getuserprofilebytoken(token);
        return res.status(200).send({ user});
    }
    catch(error){
      res.status(500).send({ message: error.message });
    }  
}

const getalluser=async(req,res)=>{
    try{
        const users=await getuser();
        return res.status(200).send({users});  
    }
    catch(error){
        res.status(500).send({ message: error.message });
    }
}
module.exports={getuserproflie,getalluser};