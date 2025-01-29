import { useEffect } from "react";
import styles from "./Disclaimer.module.css";

const Disclaimer = () => {

  // Just playing the old fashioned way
  useEffect(() => {
    const disclaimerObject = document.getElementById("disclaimer");
    const deleteObject = document.getElementById("delete");

    const toggleDisclaimer = () => {
      if (disclaimerObject && disclaimerObject.style.opacity !== "0") {
        disclaimerObject.style.opacity = "0";
        //window.alert("Hiding disclaimer! Click on bottom again to unhide.");
      } else {
        disclaimerObject.style.removeProperty("opacity");
        //window.alert("Disclaimer unhidden!");
      }
    };

    const deleteDisclaimer = () => {
      disclaimerObject.remove();
    };

    if (disclaimerObject) {
      disclaimerObject.addEventListener("click", toggleDisclaimer);
      deleteObject.addEventListener("click", deleteDisclaimer);
    }
    const anchorElements = disclaimerObject.getElementsByTagName("a");
    for (let i = 0; i < anchorElements.length; i++)
      anchorElements[i].addEventListener("click", (event) => {
        event.stopPropagation();
      });

    return () => {
      disclaimerObject.removeEventListener("click", toggleDisclaimer);
      deleteObject.removeEventListener("click", deleteDisclaimer);
      for (let i = 0; i < anchorElements.length; i++)
        anchorElements[i].removeEventListener("click", (event) => {
          event.stopPropagation();
        });
    };
  }, []);

  return (
    <footer id="disclaimer" className={styles.disclaimer}>
      <div className={styles.disclaimerContent}>
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
        some features might not be optimized or available yet. More info will be
        available soon. Click on the bottom of the page to toggle this message
        on or off.{" "}
        <span id="delete" style={{ color: "var(--green)" }}>
          To permanently disable, click here.
        </span>
        <br />
        <span style={{ color: "var(--pink)" }}>
          {" "}
          Feel free to check the code! :)
        </span>
      </div>
    </footer>
  );
};

export default Disclaimer;
