const http = require("http");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const { Server } = require("socket.io");

const User = require("./models/user.model");
const Lobby = require("./models/lobby.model");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: `http://${process.env.REACT_APP_IP_ADDRESS}:5173`, // React app origin
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: "*", // Add your frontend URL here
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
const userRoutes = require("./routes/userRoutes")(io);
app.use("/api", userRoutes);
const path = require("path");

const userSocketMap = new Map();

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

  socket.on("joinLobby", async ({userId, lobbyId}) => {
    console.log(`User joined lobby: ${lobbyId}`);
    socket.join(lobbyId);
    const users = await User.find({ lobbyId });
    userSocketMap.set(socket.id, { userId, lobbyId });
    const userArray = users.map((user) => ({
      id: user._id,
      name: user.name,
      lobbyId: user.lobbyId,
      score: user.score,
    }));
    io.to(lobbyId).emit("joinRoom", userArray);
  });

  socket.on("disconnect", async () => {
    console.log("A user disconnected");

    const userInfo = userSocketMap.get(socket.id);
    if (userInfo) {
      console.log("User disconnected");
      await User.findByIdAndDelete(userInfo.userId);
      userSocketMap.delete(socket.id);
      const lobby = await Lobby.findById(userInfo.lobbyId);
      lobby.users = lobby.users.filter((user) => user.id !== socket.id);
      await lobby.save();
      const users = await User.find({ lobbyId: userInfo.lobbyId });
      const userArray = users.map((user) => ({
        id: user._id,
        name: user.name,
        lobbyId: user.lobbyId,
        score: user.score,
      }));
      io.to(userInfo.lobbyId).emit("joinRoom", userArray);
    }
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
