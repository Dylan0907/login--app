const Message = require("../models/Message");

const postMessage = async (sender, recipient, content, attachments) => {
  const newMessage = new Message({
    sender,
    recipient,
    content,
    attachments
  });
  await newMessage.save();
  return newMessage;
};

const fetchMessage = async (senderid, recipientid) => {
  const messages = await Message.find({
    $or: [
      { sender: senderid, recipient: recipientid },
      { sender: recipientid, recipient: senderid }
    ]
  }).sort({ sentAt: 1 }); // Sort by sent time (ascending)
  return messages;
};

module.exports = {
  postMessage,
  fetchMessage
};
