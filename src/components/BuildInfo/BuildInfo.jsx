import React, { useState } from "react";
import styles from "./BuildInfo.module.css";

const BuildInfo = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <header className={styles.header} style={{opacity: isVisible ? 1 : 0}}>
      <div className={styles.headerBg} onClick={toggleVisibility}>
        Development build. Recommended to navigate with arrow keys / ESC / Enter. Hover for more info. Copyright xKimozZ, 2024 - {new Date().getFullYear()}.
      </div>
      {isVisible && (
        <div id="disclaimer" className={styles.disclaimer}>
          <div className={styles.disclaimerContent}>
          <div style={{textAlign: "center" }}>
          <span style={{ color: "var(--pink)" }}>
              GTA Vice City PS2 Frontend:{" "}
            </span>
            <span style={{ color: "#61dafb" }}>React Recreation. </span>
            <span style={{ color: "var(--green)" }}>
              <a
                href="https://github.com/xKimozZ"
                target="_blank"
                rel="noopener noreferrer"
              >
                Built by xKimozZ{" "}
              </a>
              <a
                href="https://www.linkedin.com/in/karim-ayman-h/"
                target="_blank"
                rel="noopener noreferrer"
              >
                (Karim Ayman).{" "}
              </a>
            </span>
          </div>
            <br />
            The original assets and design belong to{" "}
            <a
              href="https://www.rockstargames.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rockstar Games
            </a>{" "}
            and Take-Two Interactive, and this is a non-profit hobby project that
            does not intend to infringe on any trademarks.
            <br />
            Please note the app is still under development primarily for desktop, so
            some features might not be optimized or implemented yet. More info will be
            available soon. If you wish to hide the header, you can click to toggle its visibility.{" "}
            <br />
            <div style={{ color: "var(--pink)", textAlign: "center" }}>
              {" "}
              Feel free to check the code! :)
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default React.memo(BuildInfo);
