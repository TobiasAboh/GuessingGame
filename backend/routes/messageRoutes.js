const express = require("express");
const router = express.Router();
const Message = require("../models/lobby.model");

router.post("/messages", async (req, res) => {
  const { lobbyId, userId, text } = req.body;
  if(!lobbyId || !userId || !text) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = await User.FindById(userId);
    if(!userId || user.lobbyId !== lobbyId) {
      return res.status(401).json({ message: "User is not in lobby" });
    }
    const lobby = await Lobby.findById(lobbyId);
    lobby.messages.push({ sender: user.name, text, timestamp: Date.now() });
    await lobby.save();
    res.status(200).json({ message: "Message sent" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving messages" });
  }
});

router.get("/messages/:lobbyId", async (req, res) => {
  const { lobbyId } = req.params;
  try {
    const lobby = await Lobby.findById(lobbyId);
    if(!lobby) {
      return res.status(404).json({ message: "Lobby not found" });
    }
    res.status(200).json(lobby.messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving messages" });
  }
});
