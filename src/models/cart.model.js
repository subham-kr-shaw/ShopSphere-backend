const mongoose=require("mongoose");
const schema=mongoose.Schema;

const cartschema=new schema({
    user:{
        type:schema.Types.ObjectId,
        ref:"users",
        required:true,
    },
    cartitems:[{
        type:schema.Types.ObjectId,
        ref:"cartitems",
        required:true,
    }],
    totalprice:{
        type:Number,
        default:0,
        required:true,
    },
    totalitem:{
         type:Number,
        default:0,
        required:true,
    },
    totaldiscountedprice:{
        type:Number,
        default:0,
        required:true,
    },
    discount:{
       type:Number,
        default:0,
        required:true, 
    }
})
const cart=mongoose.model("cart",cartschema);
module.exports=cart;