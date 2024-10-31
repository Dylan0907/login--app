const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let users = [];

app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  // Check if the user already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Create a new user
  const newUser = { email, password };
  users.push(newUser);
  res.status(201).json({ message: "User created successfully" });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  let user = users.find((user) => user.email === email);
  if (!user) {
    //user doesnt exist
    user = { email, password };
    users.push(user);
    return res.status(200).json({ message: "User created successfully" });
  } else if (user.password !== password) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ email: user.email }, "your_secret_key");

  res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
