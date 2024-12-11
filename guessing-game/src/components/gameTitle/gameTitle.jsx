import styles from "./gameTitle.module.css";

const GameTitle = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Guess The Character</h1>
    </header>
  );
};

export default GameTitle;
