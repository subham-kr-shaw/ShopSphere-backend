const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userschema = new schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email:{
    type:String,
    required:true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: "customer"
  },
  phonenumber: {
    type: String,
    unique: true,
    sparse: true 
  },
  address: [

    {
      type: schema.Types.ObjectId,
      ref: "address"
    }
  ],
  payment: [

    {
      type: schema.Types.ObjectId,
      ref: "payment_info"
    }
  ],
  ratings: [{
    type: schema.Types.ObjectId,
    ref: "ratings"
  }],
  reviews: [{
    type: schema.Types.ObjectId,
    ref: "reviews"
  }],
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const user=mongoose.model("users",userschema);



module.exports=user;