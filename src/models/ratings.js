// const mongoose=require('mongoose')
// const schema=mongoose.Schema;

// const ratingschema=new schema({
//     user:{
//         type:schema.Types.ObjectId,
//         ref:"users",
//         required:true,
//     },
//     product:{
//         type:schema.Types.ObjectId,
//         ref:"product",
//         required:true,
//     },
//     reting:{
//         type:Number,
//         required:true,
//     },
//     createdat:{
//         type:Date,
//         default:Date.now(),
//     }
// })
// const rating=mongoose.model("ratings",ratingschema);
// module.exports=rating;
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ratingschema = new schema({
    user: {
        type: schema.Types.ObjectId,
        ref: "users",  // ✅ keep consistent with reviews model
        required: true,
    },
    product: {
        type: schema.Types.ObjectId,
        ref: "product",
        required: true,
    },
    rating: {           // ✅ fixed typo: was "reting"
        type: Number,
        required: true,
    },
    createdat: {
        type: Date,
        default: Date.now  // ✅ removed ()
    }
});

const rating = mongoose.model("ratings", ratingschema);
module.exports = rating;