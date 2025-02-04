import styles from "./MobileWarning.module.css"

const MobileWarning = () => {

  return (
    <div className={`${styles.phone} arborcrest arborcrestM`}>
        <div className={`${styles.phoneBg}`} />
        <div className={`${styles.phoneContent}`}>
        Portrait support currently unavailable.
        <br />
        <p style={{textAlign:"left"}}>Please rotate your device into landscape mode or increase the width of the browser window.</p>
        <p style={{textAlign:"left"}}>Otherwise, it is highly recommended that you use a desktop/laptop for the best experience.</p>
        </div>
      </div>
  );
}

export default MobileWarning;
