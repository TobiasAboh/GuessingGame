import React from "react";
import styles from "./GamePage.module.css";
import ChatBox from "../../components/chatBox.jsx";
import MysteryObject from "../../components/mysteryObject.jsx";
import UsersSideBar from "../../components/userSideBar/usersSideBar.jsx";
import GameTitle from "../../components/gameTitle/gameTitle.jsx";
import DescriptionBox from "../../components/descriptionBox/descriptionBox.jsx";

const GamePage = () => {
  // const getUser = async () => {
  //   const user = await fetch("http://localhost:3000/user", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // };
  // style={{ display: "grid", gridTemplateColumns: "0.2fr 1fr", marginInline: "auto", maxWidth: "900px" }}
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <GameTitle />
        <div className={styles.board}>
          <div
            className={styles.wrapper}
          >
            <UsersSideBar />
            <MysteryObject name="anime" isRevealed={true} />
          </div>
          <div style={{display: "grid", gridTemplateRows: "auto 1fr", maxWidth: "500px"}}>
            <DescriptionBox description="This is a description and it is very long and it will be cut off. " />
            <ChatBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePage;
