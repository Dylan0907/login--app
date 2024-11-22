const express = require("express");

const router = express.Router();
const messagesController = require("../controllers/messagesControler");

router.post("/", messagesController.postMessage);

router.get("/:sender/:recipient", messagesController.fetchMessages);

module.exports = router;
