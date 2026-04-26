
const { savepaymentmode, getuserpayments } = require("../services/payment.services");
const { getuserprofilebytoken } = require("../services/user.service");

// POST /api/payment/save
// Body: { paymentmode: "cod" | "online", amount: number }
const savepayment = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).send({ message: "token is not accessible" });

    const user = await getuserprofilebytoken(token);
    const { paymentmode, amount } = req.body;

    if (!paymentmode) return res.status(400).send({ message: "paymentmode is required" });
    if (amount === undefined) return res.status(400).send({ message: "amount is required" });

    const payment = await savepaymentmode ({
      userid: user._id,
      paymentmode,
      amount,
    });

    return res.status(201).send({ message: "Payment saved", payment });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// GET /api/payment/
const getpayments = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).send({ message: "token is not accessible" });

    const user = await getuserprofilebytoken(token);
    const payments = await getuserpayments(user._id);

    return res.status(200).send({ payments });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { savepayment, getpayments };