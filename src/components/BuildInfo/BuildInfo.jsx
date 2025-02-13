import React, { useState } from "react";
import styles from "./BuildInfo.module.css";
import useSoundManager from "../../hooks/useSoundManager";

const BuildInfo = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { playInfo } = useSoundManager();

  const toggleVisibility = () => {
    playInfo();
    setIsVisible(!isVisible);
  };

  return (
    <header
      className={`${styles.header} arborcrestXS`}
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div className={styles.headerBg} onClick={toggleVisibility}>
        Development build. Recommended to navigate with arrow keys / ESC /
        Enter. Hover for more info. Copyright xKimozZ, 2024 -{" "}
        {new Date().getFullYear()}.
      </div>
      {isVisible && (
        <div id="disclaimer" className={styles.disclaimer}>
          <div className={styles.disclaimerContent}>
            <div style={{ textAlign: "center" }}>
              <span style={{ color: "var(--pink)", fontSize: "1.45em" }}>
                GTA Vice City PS2 Frontend:{" "}
              </span>
              <span style={{ color: "#61dafb" }}>React Recreation. </span>
              <span style={{ color: "var(--green)" }}>
                <u>
                  <a
                    href="https://github.com/xKimozZ"
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={0}
                  >
                    Built by xKimozZ{" "}
                  </a>
                  <a
                    href="https://www.linkedin.com/in/karim-ayman-h/"
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={0}
                  >
                    (Karim Ayman).{" "}
                  </a>
                </u>
              </span>
            </div>
            <br />
            The original assets and design belong to{" "}
            <a
              href="https://www.rockstargames.com"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={0}
            >
              Rockstar Games
            </a>{" "}
            and Take-Two Interactive, and this is a non-profit hobby project
            that does not intend to infringe on any trademarks.
            <br />
            Please note the app is still under development primarily for
            desktop, so some features might not be optimized or implemented yet.
            More info will be available soon. You can toggle the visibility of
            this header by clicking on the top of the page. <br />
            <div style={{ color: "var(--pink)", textAlign: "center" }}>
              {" "}
              Feel free to check the code using browser developer tools until the repo goes public! :)
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default React.memo(BuildInfo);
