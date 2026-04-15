const mongoose=require('mongoose')
const schema=mongoose.Schema;

const reviewschema=new schema({
    user:{
        type:schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    reviews:{
        type:String,
        required:true,
    },
    product:{
        type:schema.Types.ObjectId,
        ref:"product",
        required:true,

    },
    createdat:{
        type:Date,
        default:Date.now()
    }
})

const reviews=mongoose.model('reviews',reviewschema);
module.exports=reviews