import { io } from "socket.io-client";

const socket = io("http://192.168.131.23:3000", {
  transports: ["websocket"],
  reconnection: true,
});

export default socket;
