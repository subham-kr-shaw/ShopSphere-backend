// const { generatetoken } = require("../config/jwtprovider");
// const { createcart } = require("../services/cart.service");
// const { createuser, findbyemail } = require("../services/user.service");
// const bcrypt = require('bcrypt');

// const register = async (req, res) => {
//     try {
//         const user = await createuser(req.body);
//         const token = await generatetoken(user._id);
//         await createcart(user._id || user);
//         return res.status(201).send({ message: "register success", token });
//     }
//     catch (error) {
//         return res.status(500).send({ message: error.message });
//     }
// }
// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await findbyemail(email);
//         if (!user) return res.status(404).send({ message: "user does not exist" });
//         const matchpass = await bcrypt.compare(password, user.password);
//         if (!matchpass) return res.status(401).send({ message: "invalid credentials" });
//         const token = await generatetoken(user._id);
//         return res.status(200).send({ token, message: "successfully logged in" });
//     }
//     catch (error) {
//         return res.status(500).send({ message: error.message });
//     }
// }  
// module.exports = { register, login };
const { generatetoken } = require("../config/jwtprovider");
const { createcart } = require("../services/cart.service");
const { createuser, findbyemail } = require("../services/user.service");
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const user = await createuser(req.body);
        const token = await generatetoken(user._id);
        await createcart(user._id || user);
        // ✅ return role so frontend can redirect correctly
        return res.status(201).send({ message: "register success", token, role: user.role });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findbyemail(email);
        if (!user) return res.status(404).send({ message: "user does not exist" });
        const matchpass = await bcrypt.compare(password, user.password);
        if (!matchpass) return res.status(401).send({ message: "invalid credentials" });
        const token = await generatetoken(user._id);
        // ✅ return role so frontend can redirect correctly
        return res.status(200).send({ token, role: user.role, message: "successfully logged in" });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

module.exports = { register, login };