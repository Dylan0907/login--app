const User = require("../models/User");

const createUser = async (email, password) => {
  const newUser = new User({ email, password });
  await newUser.save();
  return newUser;
};

const findUser = async (email) => {
  return await User.findOne({ email });
};

module.exports = {
  createUser,
  findUser
};
