require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT;
const User = require("./models/User");
const bcrypt = require("bcrypt");

mongoose.connect(process.env.MONGODB_URI);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://127.0.0.1:5500"
  })
);

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (email.length === 0 || password.length === 0) {
    return res.status(400).json({ message: "Complete all fields" });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Create a new user
  const user = new User({ email, password });
  await user.save();

  res.status(201).json({ message: "User created successfully" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
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
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
