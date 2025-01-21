import { useDispatch, useSelector } from "react-redux";
import styles from "./Button.module.css";
import { useEffect, useState, useRef, act } from "react";
import { changeLocation } from "../../store/cursorSlice";
import { navigationSelector, setCurrentActions, setHoveredOption, setNextGroup } from "../../store/navigationSlice";
import { buttonGroups } from "../../constants/buttonGroups";
import { useEventHandlerContext } from "../../context/EventHandlerContext";

const Button = ({
  buttonText = "Sample",
  buttonNumber = 0,
  textColor = "var(--white)",
  buttonGroup = buttonGroups.MAIN,
  actions = {},
  cursorFactors = {
    clipFactor: undefined,
    topFactor: undefined,
    leftFactor: undefined,
    widthFactor: undefined,
    heightFactor: undefined,
  },
}) => {
  const [textStyle, setTextStyle] = useState({
    color: textColor,
  });
  const buttonRef = useRef(null);
  const dispatch = useDispatch();
  const { hoveredOption, activeButtonGroup } = useSelector(navigationSelector);
  const { handleHover: hoverFunction, handleSelect: selectFunction } =  useEventHandlerContext();

  const isHovered = () => {
    return hoveredOption === buttonNumber;
  };

  const isActive = () => {
    return activeButtonGroup === buttonGroup;
  }

  useEffect(() => {
    const updatePosition = () => {
      if (isHovered() && isActive() && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const rectInPercentages = {
          top: (rect.top / viewportHeight) * 100,
          left: (rect.left / viewportWidth) * 100,
          width: (rect.width / viewportWidth) * 100,
          height: (rect.height / viewportHeight) * 100,
          ...cursorFactors,
        };

        dispatch(changeLocation(rectInPercentages));
        dispatch(setCurrentActions(actions));
      }
    };

    updatePosition(); // Initial call
    window.addEventListener("resize", updatePosition); // Update on resize

    return () => {
      window.removeEventListener("resize", updatePosition); // Clean up
    };
  }, [hoveredOption, activeButtonGroup]);

  const handleHover = () => {
    if (isHovered() || !isActive() ) return;
    hoverFunction?.(buttonNumber);
  };

  const handleSelect = () => {
    if (!isActive() ) return;
    selectFunction?.(buttonNumber);
  };

  return (
    <div
      ref={buttonRef}
      className={`${styles.buttonContainer}`}
      onMouseEnter={handleHover}
      onClick={handleSelect}
      style={{ ...textStyle }}
    >
      <span>{buttonText}</span>
    </div>
  );
};

export default Button;
