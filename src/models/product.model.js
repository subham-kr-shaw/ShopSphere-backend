const mongoose=require('mongoose');

const schema=mongoose.Schema;
const productschema=new schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    discountedprice:{
        type:Number,
        required:true,
    },
    discountpercent:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    brand:{
      type:String,
    },
    color:{
        type:String
    },
    size:[{
      name:{type:String},
      quantity:{type:Number}
    }],
    imageurl:{
        type:String,
    },
    ratings:[
        {
         type:schema.Types.ObjectId,
         ref:"ratings",
        }
    ],
    reviews:[{
     type:schema.Types.ObjectId,
     ref:"reviews",
    }],
    numratings:{
        type:Number,
        default:0
    },
    category:{
        type:schema.Types.ObjectId,
        ref:"category"
    },
    createdat:{
        type:Date,
        default:Date.now(),
    }
})

const product=mongoose.model("product",productschema);
module.exports=product