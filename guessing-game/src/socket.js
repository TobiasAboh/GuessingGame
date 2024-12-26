import { io } from "socket.io-client";

const socket = io(`http://${import.meta.env.VITE_IP_ADDRESS}:3000`, {
  transports: ["websocket"],
  reconnection: true,
});

export default socket;
