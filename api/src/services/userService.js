const User = require("../models/User");

const createUser = async (email, password) => {
  const newUser = new User({ email, password });
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

const modifyUser = async (userEmail, newPassword) => {
  try {
    // update user password
    const updatedUser = await User.findOneAndUpdate(
      { email: userEmail }, // Search for email
      { password: newPassword }, // update new password
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    console.log("Updated user:", updatedUser);
    return updatedUser;
  } catch (err) {
    console.error("Error while upgrading user:", err);
    throw err;
  }
};

module.exports = {
  createUser,
  findUser,
  deleteUser,
  modifyUser
};
