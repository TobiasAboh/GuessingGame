import socket from "../socket";

import TextInput from "./textInput";
import { useEffect, useState } from "react";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState({});
  const currentUserId = localStorage.getItem("currentUserId");
  const lobbyId = localStorage.getItem("lobbyId");

  const getUserData = async () => {
    try {
      const response = await fetch(
        `http://${import.meta.env.VITE_IP_ADDRESS}:3000/api/users/${currentUserId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        const error = await response.json();
        console.log(`Error: ${error.message}`);
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  const handleSendMessage = (newMessage) => {
    try {
      if (newMessage.trim()) {
        socket.emit("sendMessage", {
          lobbyId,
          currentUserId,
          text: newMessage,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
    if (lobbyId) {
      const handleMessage = (message) => {
        console.log(`new messaege: ${message.text}`);
        setMessages((prevMessages) => [...prevMessages, message]); // Append new message
      };
      socket.on("receiveMessage", handleMessage);
    }

    return () => {
      socket.off("receiveMessage");
    };
  }, []);
  return (
    <>
      <div style={styles.chatContainer}>
        <div style={{ backgroundColor: "pink", flex: "1" }}>
          {messages.map((msg, index) => (
            <div key={index}>
              <div>{msg.sender}</div>
              <div style={styles.chatBubble}>{msg.text}</div>
            </div>
          ))}
        </div>
        <TextInput onSendMessage={handleSendMessage} />
      </div>
    </>
  );
};

const styles = {
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
    // maxWidth: "900px",
    height: "100%",
    // marginInline: "auto",
    backgroundColor: "purple",
  },

  chatBubble: {
    backgroundColor: "white",
    width: "fit-content",
    padding: "10px",
    borderRadius: "10px",
  },
};
export default ChatBox;
