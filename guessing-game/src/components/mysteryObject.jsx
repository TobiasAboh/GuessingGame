const MysteryObject = (props) => {
  const { name, isRevealed } = props;

  return (
    <div style={styles.wrapper}>
      <div style={styles.picture}>
        <p>Mystery Object</p>
      </div>
      <div style={styles.word}>
        {name.split("").map((letter, index) => {
          return (
            <p key={index} style={{...styles.letter, color: isRevealed ? "white" : "black"}}>
              {letter}
            </p>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
    wrapper: {
        // width: "100%",
        // maxWidth: "800px",
        minHeight: "150px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey",
    },
    picture: {
        maxWidth: "150px",
        minHeight: "100px",
        backgroundColor: "white",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        margin: "10px",
    },
    word: {
        display: "flex",
        flexDirection: "row",
    },
    letter: {
        // minWidth: "20px",
        minHeight: "20px",
        fontSize: "30px",
        color: "white",
        // backgroundColor: "black",
        borderRadius: "10px",
        padding: "10px",
        marginInline: "0.1rem",
        alignItems: "center",
    },
}

export default MysteryObject;
