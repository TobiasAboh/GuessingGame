const mongoose = require("mongoose");

const lobbySchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of users
  messages: [
    {
      sender: String,
      text: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Lobby", lobbySchema);
