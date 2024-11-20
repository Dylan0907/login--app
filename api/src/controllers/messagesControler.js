const messagesService = require("../services/messagesService");

//create new message
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

module.exports = {
  postMessage
};
