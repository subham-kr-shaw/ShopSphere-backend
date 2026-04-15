const mongoose = require("mongoose");
const schema=mongoose.Schema;

const addressschema=new schema({
   firstname:{
    type:String,
    required:true,
   },
   lastname:{
    type:String,
    required:true,
   },
   streetaddress:{
     type:String,
     required:true,
   },
   city:{
    type:String,
    required:true,
   },
   state:{
    type:String,
    required:true,
   },
   zipcode:{
    type:Number,
    required:true,
   },
   user:{
     type:schema.Types.ObjectId,
     ref:"users",
   },
   mobile:{
     type:String,
     required:true,
   }
})
const address=mongoose.model("address",addressschema);
module.exports=address;