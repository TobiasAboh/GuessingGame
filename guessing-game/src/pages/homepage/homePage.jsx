import { useNavigate } from "react-router-dom";

import { UserModel } from "../../models/userModel.jsx";
import DropdownMenu from "../../components/dropDownMenu/dropDownMenu.jsx";
import styles from "./HomePage.module.css";
import { useState } from "react";
import socket from "../../socket.js";

const HomePage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(UserModel);

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleButtonClick = async () => {

    try {
      if(username.trim() === ""){
        alert("Please enter a username");
        return;
      }
      const response = await fetch("http://192.168.131.23:3000/api/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username }),
      });

      if (response.ok) {
        console.log("User created successfully");
        const data = await response.json();
        localStorage.setItem("currentUserId", data.userId);
        localStorage.setItem("lobbyId", data.lobbyId);
        socket.emit("joinLobby", data.lobbyId);
        setUser(""); // Clear input field
      } else {
        const error = await response.json();
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
    navigate("/game"); // Navigate to the About page
  };

  return (
    <>
      <div className={styles.homepage}>
        <header>
          <h1 className={styles.title}>Guess The Character</h1>
        </header>
        <div className={styles.wrapper}>
          <div>
            <div style={{ display: "flex" }}>
              <input
                className={styles.userinput}
                onChange={handleInputChange}
                type="text"
                name="Username"
                id=""
              />
              <DropdownMenu
                listItems={["Objects", "Characters", "Youtubers"]}
              />
            </div>
            <div className={styles.menu}>
              <button
                className={styles.button}
                style={{ boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.5)" }}
                onClick={handleButtonClick}
              >
                play
              </button>
              <button className={styles.button}>create private game</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
