import { useDispatch, useSelector } from "react-redux";
import styles from "./SaveGame.module.css";
import { useEffect, useState, useRef, act } from "react";
import { changeLocation } from "../../../store/cursorSlice";
import { navigationSelector, setCurrentActions, setHoveredOption, setNextGroup } from "../../../store/navigationSlice";
import useEventHandler from "../../../hooks/useEventHandler";
import { buttonGroups } from "../../../constants/buttonGroups";

const SaveGame = ({
  buttonNumber = 3,
  buttonText = `Save File ${buttonNumber} Not Present`,
  buttonGroup = buttonGroups.LOAD,
  actions = {fileExists: false},
}) => {
  const buttonRef = useRef(null);
  const dispatch = useDispatch();
  const { hoveredOption, activeButtonGroup } = useSelector(navigationSelector);
  const { handleHover: hoverFunction, handleSelect: selectFunction } =  useEventHandler();

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
    selectFunction?.();
  };

  return (
    <div
      ref={buttonRef}
      className={`${styles.saveButton}`}
      onMouseEnter={handleHover}
      onClick={handleSelect}
    >
      <span>{buttonText}</span>
    </div>
  );
};

export default SaveGame;
