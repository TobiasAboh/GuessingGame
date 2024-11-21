const http = require("http");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const { Server } = require("socket.io");

const User = require("./models/user.model");
const Lobby = require("./models/lobby.model");
const userRoutes = require("./routes/userRoutes");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://192.168.131.23:5173", // React app origin
    methods: ["GET", "POST"],
  },
});

app.use(cors({
  origin: "*", // Add your frontend URL here
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());
app.use("/api", userRoutes);
const path = require("path");

mongoose
  .connect(
    "mongodb+srv://tobiasaboh:juzdTCfZhUpx0zlp@backenddb.enkws.mongodb.net/Node-API?retryWrites=true&w=majority&appName=backendDB"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(3000, "0.0.0.0", () => {
      console.log(`Server is running on http://localhost/:${3000}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinLobby", (lobbyId) => {
    console.log(`User joined lobby: ${lobbyId}`);
    socket.join(lobbyId);
  });

  socket.on("sendMessage", async ({ lobbyId, currentUserId, text }) => {
    const user = await User.findById(currentUserId);

    if (!currentUserId || user.lobbyId.toString() !== lobbyId) {
      socket.emit("error", "User is not in lobby");
      return;
    }
    console.log(lobbyId + " " + currentUserId + " " + text);
    const lobby = await Lobby.findById(lobbyId);
    const message = { sender: user.name, text, timestamp: Date.now() };
    lobby.messages.push(message);
    await lobby.save();
    io.to(lobbyId).emit("receiveMessage", message);
  });

  socket.off("disconnect", () => {
    console.log("A user disconnected");
  });
});
// Start the server