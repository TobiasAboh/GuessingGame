// routes/userRoutes.js
const express = require("express");
const User = require("../models/user.model");
const Lobby = require("../models/lobby.model");
const router = express.Router();

router.post("/join", async (req, res) => {
  
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).send({ message: "Username is required" });
  }

  try {
    let lobby = await Lobby.findOne().populate("users");
    if(!lobby || lobby.users.length > 5) {

      lobby = await Lobby.create({ users: [] });
      
    }
    
    let user = await User.create({ name, lobbyId: lobby._id });
    
    lobby.users.push(user._id);
    await lobby.save();
    res.status(200).json({lobbyId: lobby._id, userId: user._id});

  } catch (error) {
    res.status(500).send({ message: "Error joining lobby", error });
  }
});

router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Error finding user", error });
  }
});

module.exports = router;
