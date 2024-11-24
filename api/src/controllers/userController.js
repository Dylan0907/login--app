const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userService = require("../services/userService");

// Create a new user
const createUser = async (req, res) => {
  const { email, password } = req.body;
  if (email.length === 0 || password.length === 0) {
    return res.status(400).json({ message: "Complete all fields" });
  }
  const existingUser = await userService.findUser(email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = await userService.createUser(email, password);

  res.status(201).json({ message: "User created successfully", data: newUser });
};

//Find user
const findUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.findUser(email);
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Compare provided password with stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ email: user.email }, "your_secret_key");

  res.status(200).json({ token });
};

//Delete user by email
const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;
    const deletedUser = await userService.deleteUser(email);
    if (!deletedUser) {
      return res.status(400).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User deleted succesfully", user: deletedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

// modify user
const modifyUser = async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;
    const user = await userService.findUser(email);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const modifiedUser = await userService.modifyUser(
      user.email,
      hashedPassword
    );

    res
      .status(200)
      .json({ message: "User modified succesfully", user: modifiedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error modifying user", error: error.message });
  }
};

module.exports = {
  createUser,
  findUser,
  deleteUser,
  modifyUser
};
