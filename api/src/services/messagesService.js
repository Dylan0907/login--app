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

module.exports = {
  postMessage
};
