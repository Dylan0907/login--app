const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userService = require("../services/userService");

const createUser = async (req, res) => {
  const { email, password } = req.body;

  if (email.length === 0 || password.length === 0) {
    return res.status(400).json({ message: "Complete all fields" });
  }
  const existingUser = userService.findUser(email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Create a new user
  const newUser = await userService(email, password);

  res.status(201).json({ message: "User created successfully", data: newUser });
};

const findUser = async (req, res) => {
  const { email, password } = req.body;

  const user = userService.findUser(email);
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

module.exports = {
  createUser,
  findUser
};
