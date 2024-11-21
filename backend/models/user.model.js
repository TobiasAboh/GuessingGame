// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  lobbyId: { type: mongoose.Schema.Types.ObjectId, ref: "Lobby", required: true},
  name: { type: String, required: [ true, "Name is required" ] },
  score: { type: Number, default: 0 },
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;
