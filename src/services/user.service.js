const { getuseridfromtoken } = require("../config/jwtprovider");
// const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const createuser = async (userdata) => {
  try {
    const { firstname, lastname, email, password } = userdata || {};
    if (!email) throw new Error("email is required");
    if (!password) throw new Error("password is required");
    const exists = await User.findOne({ email });
    if (exists) throw new Error("email already exists");
    const pass = await bcrypt.hash(password, 8);
    const created = await User.create({ firstname, lastname, email, password: pass });
    return created;
  } catch (error) {
    throw error;
  }
};
const findbyid = async (userid) => {
  try {
    if (!userid) throw new Error("userid is required");
    const found = await User.findById(userid).populate("address");
    if (!found) throw new Error("user not found");
    return found;
  } catch (error) {
    throw error;
  }
};
const findbyemail = async (email) => {
  try {
    if (!email) return null;
    const found = await User.findOne({ email });
    return found || null;
  } catch (error) {
    throw error;
  }
};
const getuserprofilebytoken = async (token) => {
  try {
    if (!token) throw new Error("token is required");
    const userId = await getuseridfromtoken(token);
    if (!userId) throw new Error("invalid token");
    const found = await findbyid(userId);
    return found;
  } catch (error) {
    throw error;
  }
};

const getuser = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error;
  }
};

module.exports={createuser,findbyid,findbyemail,getuserprofilebytoken,getuser};