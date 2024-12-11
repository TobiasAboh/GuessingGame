import { useEffect, useState } from "react";
import globalstyles from "./userSideBar.module.css";
import socket from "../../socket";


const UserItem = ({ name, score }) => {
  return (
    <div style={styles.userItem}>
      <p className={globalstyles.username}>{name}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p className={globalstyles.score}>{score}</p>
        <p className={globalstyles.score}>points</p>
      </div>
    </div>
  );
};

const UsersSideBar = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const AddUser = (users) => {
      setUsers(users);
    };
    socket.on("joinRoom", AddUser);
    return () => {
      socket.off("joinRoom");
    };
  }, []);
  return (
    <div style={styles.container}>
      {users.map((user, index) => {
        return <UserItem key={index} name={user.name} score={user.score} />;
      })}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    // width: "250px",
    // maxWidth: "200px",
    minHeight: "150px",
    flexDirection: "column",

    color: "black",
    backgroundColor: "white",
  },
  userItem: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    minHeight: "30px",
    borderBottom: "1px solid grey",
    gap: "40px",
  },
  score: {
    borderRadius: "100px",
  },
};

export default UsersSideBar;
