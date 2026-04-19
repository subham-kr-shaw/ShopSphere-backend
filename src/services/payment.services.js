const razorpay = require("../config/razorpayclient");
const { findorderbyid } = require("./order.service")

const createpaymentlink = async (orderid) => {
    try {
        const order = await findorderbyid(orderid);
        const paymentlinkrequest = {
            amount: order.totalprice * 100,
            currency: "INR",
            customer: {
                name: order.user.firstname + " " + order.user.lastname;
                contact: order.user.mobile;
                email: order.user.email
            },
            notify: {
              sms:true,
              email:true
            },
            remainder_enable:true,
            callback_url:`http://localhost::3000/payment/${orderid}`,
            callback_method:'get'
        }
        const paymentlink=await razorpay.paymentLink.create(paymentlinkrequest);
            
        const paymentlinkid=paymentlink.id,
        const payment_link_url=paymentlink.short_url;

        const resdata={
            paymentlinkid
        }
        return resdata
    } catch (error) {
        throw new Error({ "message":})
    }
}

const updatepaymentinformation=async(reqdata)=>{
    const paymentid=reqdata.payment._id;
    const orderid=reqdata.order._id;
    try{
        const order=await findorderbyid(orderid);
        const payment=await razorpay.payments.fetch(paymentid);
        if(payment.status==="captured"){
            order.Paymentdetails.paymentid=paymentid;
            order.Paymentdetails.status="COMPLETED";
            order.orderstatus="PLACED";
            await order.save();
        }
        const resdata={message:"your order is placed",success:true};
        return resdata;
    }
    catch(error){
        throw new Error(error.message);
    }
}
module.exports={
    updatepaymentinformation,
    createpaymentlink
}