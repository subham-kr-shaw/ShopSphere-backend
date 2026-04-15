const { getuseridfromtoken } = require("../config/jwtprovider");
const { findbyid } = require("../services/user.service");

const authentication=async(req,res,next)=>{
    try {
        //token is in the form of string like bearer token.... 
        //when we do .split it is [bearer,token] and then we take arr[1] to get the token;
        const token=req.headers.authorization?.split(" ")[1]; 
        if(!token) return res.status(500).send({message:"token not found !!"});
        
        const userid= await getuseridfromtoken(token);
        const user=await findbyid(userid);
        req.user=user;
        console.log(token);
       next();
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
    
}
module.exports=authentication;