const User = require("../models/User");

const createUser = async (email, password) => {
  const newUser = new User({ email, password });
  console.log(email);
  await newUser.save();
  return newUser;
};

const findUser = async (email) => {
  return await User.findOne({ email });
};

const deleteUser = async (userEmail) => {
  const deletedUser = await User.findOneAndDelete({ email: userEmail });
  return deletedUser;
};

module.exports = {
  createUser,
  findUser,
  deleteUser
};
