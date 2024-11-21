import React from "react";
import ChatBox from "../../components/chatBox/chatBox.jsx";

const GamePage = () => {
  // const getUser = async () => {
  //   const user = await fetch("http://localhost:3000/user", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // };
  return (
    <>
      <ChatBox />
    </>
  );
};

export default GamePage;
