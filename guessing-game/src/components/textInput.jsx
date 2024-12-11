import React, { useEffect, useState } from "react";
import { checkIfMobile } from "../utils";

function TextInput({ onSendMessage }) {
  const [message, setMessage] = useState("");
  const [isKeyBoardVisible, setIsKeyBoardVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Function to handle the send action
  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      onSendMessage(message);
      setMessage(""); // Clear the input after sending
    }
  };

  // Optional: handle form submit (for pressing Enter to send)
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  useEffect(() => {
    setIsMobile(checkIfMobile());

    // Optional: handle keyboard visibility
    const handleResize = () => {
      if (isMobile) {
        const isKeyboardVisible =
          window.innerHeight < document.documentElement.clientHeight;
        setIsKeyBoardVisible(isKeyboardVisible);
      }
    };

    document.addEventListener("visibilitychange", handleResize);

    return () => {
      document.removeEventListener("visibilitychange", handleResize);
    };
  }, []);

  return (
    <div>
      {isMobile ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
            style={{ flex: 1, padding: "8px" }}
          />
          <button
            type="button"
            onClick={handleSend}
            style={{ padding: "8px 12px", marginLeft: "4px" }}
          >
            Send
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex" }}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
            style={{ flex: 1, padding: "8px" }}
          />
          <button
            type="button"
            onClick={handleSend}
            style={{ padding: "8px 12px", marginLeft: "4px" }}
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
}

const styles = {
  form: {
    display: "flex",
    position: "fixed",
    bottom: "0",
    maxWidth: "500px",
    marginInline: "auto",
    width: "100%",
  },
};

export default TextInput;
