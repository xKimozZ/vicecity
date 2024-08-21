import { useDispatch } from "react-redux";
import styles from "./Button.module.css";
import { useEffect, useState, useRef } from "react";
import { changeLocation } from "../../store/cursorSlice";

const Button = ({
  buttonText = "Sample",
  hoverFunction,
  selectFunction,
  buttonNumber = 0,
  hoveredOption = 0,
  setHoveredOption,
  textColor = "white",
}) => {
  const [textStyle, setTextStyle] = useState({
    color: textColor,
  });
  const buttonRef = useRef(null);
  const dispatch = useDispatch();

  const isHovered = () => {
    return hoveredOption === buttonNumber;
  };

  useEffect(() => {
    const updatePosition = () => {
      if (isHovered() && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const rectInPercentages = {
          top: (rect.top / viewportHeight) * 100,
          left: (rect.left / viewportWidth) * 100,
          width: (rect.width / viewportWidth) * 100,
          height: (rect.height / viewportHeight) * 100,
        };

        dispatch(changeLocation(rectInPercentages));
      }
    };

    updatePosition(); // Initial call
    window.addEventListener("resize", updatePosition); // Update on resize

    return () => {
      window.removeEventListener("resize", updatePosition); // Clean up
    };
  }, [hoveredOption]);

  const handleHover = () => {
    if (isHovered()) return;
    hoverFunction?.();
    setHoveredOption?.(buttonNumber);
  };

  return (
    <div
      ref={buttonRef}
      className={`${styles.buttonContainer}`}
      onMouseEnter={handleHover}
      onClick={selectFunction}
      style={{ ...textStyle }}
    >
      <span className={styles.text}>{buttonText}</span>
    </div>
  );
};

export default Button;
