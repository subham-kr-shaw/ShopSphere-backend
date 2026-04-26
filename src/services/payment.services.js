// const razorpay = require("../config/razorpayclient");
// const { findorderbyid } = require("./order.service")

// const Paymentinfo = require("../models/payment.model");

// const createpaymentlink = async (orderid) => {
//     try {
//         const order = await findorderbyid(orderid);
//         const paymentlinkrequest = {
//             amount: order.totalprice * 100,
//             currency: "INR",
//             customer: {
//                 name: order.user.firstname + " " + order.user.lastname;
//                 contact: order.user.mobile;
//                 email: order.user.email
//             },
//             notify: {
//               sms:true,
//               email:true
//             },
//             remainder_enable:true,
//             callback_url:`http://localhost::3000/payment/${orderid}`,
//             callback_method:'get'
//         }
//         const paymentlink=await razorpay.paymentLink.create(paymentlinkrequest);
            
//         const paymentlinkid=paymentlink.id,
//         const payment_link_url=paymentlink.short_url;

//         const resdata={
//             paymentlinkid
//         }
//         return resdata
//     } catch (error) {
//         throw new Error({ "message":})
//     }
// }

// const updatepaymentinformation=async(reqdata)=>{
//     const paymentid=reqdata.payment._id;
//     const orderid=reqdata.order._id;
//     try{
//         const order=await findorderbyid(orderid);
//         const payment=await razorpay.payments.fetch(paymentid);
//         if(payment.status==="captured"){
//             order.Paymentdetails.paymentid=paymentid;
//             order.Paymentdetails.status="COMPLETED";
//             order.orderstatus="PLACED";
//             await order.save();
//         }
//         const resdata={message:"your order is placed",success:true};
//         return resdata;
//     }
//     catch(error){
//         throw new Error(error.message);
//     }
// }
// module.exports={
//     updatepaymentinformation,
//     createpaymentlink
// }

// this was for Razorpay


// const Paymentinfo = require("../models/payment_info.model");
// const User = require("../models/user.model");

// Creates a payment_info doc and pushes its ref into the user's payment array





// const savepaymentmode = async ({ userid, paymentmode, amount }) => {
//   try {
//     if (!userid) throw new Error("userid is required");
//     if (!paymentmode) throw new Error("paymentmode is required");
//     if (!amount && amount !== 0) throw new Error("amount is required");

//     // 1. Create the payment record
//     const payment = await Paymentinfo.create({
//       user: userid,
//       paymentmode,
//       amount,
//       status: paymentmode === "cod" ? "pending" : "completed",
//       paidat: paymentmode === "online" ? new Date() : null,
//     });

//     // 2. Push the ref onto the user's payment array
//     await User.findByIdAndUpdate(userid, {
//       $push: { payment: payment._id },
//     });

//     return payment;
//   } catch (error) {
//     throw error;
//   }
// };

// // Get all payments for a user (populated)
// const getuserpayments = async (userid) => {
//   try {
//     const user = await User.findById(userid).populate("payment");
//     return user?.payment || [];
//   } catch (error) {
//     throw error;
//   }
// };

// module.exports = { savepaymentmode, getuserpayments };


const Paymentinfo = require("../models/payment.model");  // ✅ matches your actual filename
const User = require("../models/user.model");

const savepaymentmode = async ({ userid, paymentmode, amount }) => {
  try {
    if (!userid) throw new Error("userid is required");
    if (!paymentmode) throw new Error("paymentmode is required");
    if (!amount && amount !== 0) throw new Error("amount is required");

    const payment = await Paymentinfo.create({
      user: userid,
      paymentmode,
      amount,
      status: paymentmode === "cod" ? "pending" : "completed",
      paidat: paymentmode === "online" ? new Date() : null,
    });

    await User.findByIdAndUpdate(userid, {
      $push: { payment: payment._id },
    });

    return payment;
  } catch (error) {
    throw error;
  }
};

const getuserpayments = async (userid) => {
  try {
    const user = await User.findById(userid).populate("payment");
    return user?.payment || [];
  } catch (error) {
    throw error;
  }
};

module.exports = { savepaymentmode, getuserpayments };