const messagesService = require("../services/messagesService");

//create new message between two users
const postMessage = async (req, res) => {
  try {
    const { sender, recipient, content, attachments } = req.body;

    const savedMessage = await messagesService.postMessage(
      sender,
      recipient,
      content,
      attachments
    );
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get messages between two users
const fetchMessages = async (req, res) => {
  try {
    const { sender, recipient } = req.params;
    const messages = await messagesService.fetchMessage(sender, recipient);

    res.status(200).json(messages);
  } catch {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  postMessage,
  fetchMessages
};
