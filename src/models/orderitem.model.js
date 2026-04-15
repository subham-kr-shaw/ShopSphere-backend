const mongoose=require('mongoose');
const schema=mongoose.Schema;

const orderitemschema=new schema({
    product:[{
        type:schema.Types.ObjectId,
        ref:"product",
        required:true
    }],
    size:{
        type:String,
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    discountedprice:{
        type:Number,
        required:true,
    },
    userid:{
        type:schema.Types.ObjectId,
        ref:"users",
        required:true,
    }
})

const orderitems=mongoose.model('orderitems',orderitemschema)
module.exports=orderitems;