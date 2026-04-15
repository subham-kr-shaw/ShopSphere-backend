const jwt=require('jsonwebtoken');
const JWT_SECRET="ahhbfjhhbzefksjnkgnzekjjgvkfgvrjgvfrjijjhghg";

const generatetoken=(userid)=>{
    const token=jwt.sign({userid},JWT_SECRET,{expiresIn:"48h"})
    return token;
}


const getuseridfromtoken=(token)=>{
    const decodetoken=jwt.verify(token,JWT_SECRET);
    return decodetoken.userid;
}

module.exports={generatetoken,getuseridfromtoken};