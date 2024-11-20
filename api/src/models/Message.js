const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: "User",
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: "User",
    required: true
  },
  content: {
    type: String, // Message content
    required: true,
    trim: true,
    maxlength: 2000 // Optional limit for text length
  },
  attachments: [
    {
      type: String // URLs or paths to files (e.g., images, videos)
    }
  ],
  status: {
    type: String,
    enum: ["sent", "delivered", "read"], // Allowed statuses
    default: "sent"
  },
  sentAt: {
    type: Date,
    default: Date.now
  },
  readAt: {
    type: Date, // When the message was read
    default: null
  }
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
