require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT;

const userRouter = require("./routes/userRoute");

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

//Endpoints
app.use("user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
