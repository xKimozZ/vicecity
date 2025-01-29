import styles from "./BuildInfo.module.css";

const BuildInfo = () => {
  return (
    <header className={styles.header}>
      Development build. Preferred to navigate with arrow keys / ESC / Enter.
    </header>
  );
};

export default BuildInfo;
