const express=require('express');
const cors=require('cors');
const { userrouter } = require('./routes/user.routes');
const { authrouter } = require('./routes/auth.routes');
const productrouter = require('./routes/product.routes');
const adminrouter = require('./routes/adminorder.routes');
const adminproductrouter = require('./routes/adminproduct.routes');
const cartrouter = require('./routes/cart.routes');
const ratingrouter = require('./routes/rating.routes');
const cartitemrouter = require('./routes/cartitem.routes');
const orderrouter = require('./routes/order.routes');
const reviewrouter = require('./routes/reviews.routes');
const { paymentrouter } = require('./routes/payment.routes');
const app = express();
// app.use(cors());
// app.use(express.json());
const app = express();

// ✅ Replace this
app.use(cors())

app.use(express.json());

// ... rest of your routes stay the same

app.use('/api/user',userrouter);
app.use('/api/payment/',paymentrouter);
app.use('/auth',authrouter);
app.use("/api/products",productrouter);
app.use("/api/admin/orders",adminrouter);
app.use("/api/admin/product",adminproductrouter);
app.use("/api/cart",cartrouter);
app.use("/api/cart_items",cartitemrouter);
app.use("/api/orders",orderrouter);
app.use("/api/ratings",ratingrouter);
app.use("/api/reviews",reviewrouter);

app.get("/", function (req, res) {
    res.json({ message: "welcome to node js" });
});

module.exports=app;   