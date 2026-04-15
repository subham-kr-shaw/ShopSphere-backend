const mongoose=require('mongoose');
const schema=mongoose.Schema;

const categoryschema=new schema({
    name:{
      type:String,
      required:true,
      maxlength:50,
    },
    parentcategory:{
        type:schema.Types.ObjectId,
        ref:"categories",
    },
    level:{
        type:Number,
        required:true,
    }
})
const category=mongoose.model("category",categoryschema);
module.exports=category;
