const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", userController.createUser);

router.get("/login", userController.findUser);

router.delete("/delete", userController.deleteUser);

module.exports = router;