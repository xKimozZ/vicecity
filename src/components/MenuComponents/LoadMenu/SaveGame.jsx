import { useDispatch, useSelector } from "react-redux";
import styles from "./SaveGame.module.css";
import { useEffect, useState, useRef, act } from "react";
import { changeLocation } from "../../../store/cursorSlice";
import {
  navigationSelector,
  setCurrentActions,
  setHoveredOption,
  setNextGroup,
} from "../../../store/navigationSlice";
import { buttonGroups } from "../../../constants/buttonGroups";
import { useEventHandlerContext } from "../../../context/EventHandlerContext";
import { stringLoadSelector } from "../../../store/localizationSlice";

const SaveGame = ({
  buttonNumber = 3,
  slotNumber = 0,
  buttonGroup = buttonGroups.LOAD,
  saveFile,
}) => {
  const buttonRef = useRef(null);
  const dispatch = useDispatch();
  const { hoveredOption, activeButtonGroup } = useSelector(navigationSelector);
  const { handleHover: hoverFunction, handleSelect: selectFunction } =
    useEventHandlerContext();
  const strings = useSelector(stringLoadSelector);
  const [saveText, setSaveText] = useState(
    `${strings.savefile} ${slotNumber} ${strings.notpresent}`
  );
  const [actions, setActions] = useState({ fileExists: false });

  useEffect(() => {
    if (saveFile) {
      setSaveText(`${slotNumber}: ${saveFile.name}`);
      setActions({ fileExists: true });
      console.log(saveFile.date);
    }
  }, []);

  const isHovered = () => {
    return hoveredOption === buttonNumber;
  };

  const isActive = () => {
    return activeButtonGroup === buttonGroup && hoveredOption > 2;
  };

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
          clipFactor: 3,
          topFactor: 0.99,
          leftFactor: 0.99,
          widthFactor: 1,
          heightFactor: 1.1,
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
    if (isHovered() || !isActive()) return;
    hoverFunction?.(buttonNumber);
  };

  const handleSelect = () => {
    if (!isActive()) return;
    selectFunction?.(buttonNumber);
  };

  const generateDate = (date) => {
    const dateString =
      (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
      " " +
      getMonthString(date.getMonth()) +
      " " +
      date.getFullYear() +
      " " +
      date.toISOString().slice(11, 19);
    return dateString;
  };

  const getMonthString = (month) => {
    switch (month) {
      case 0:
        return strings.jan;
      case 1:
        return strings.feb;
      case 2:
        return strings.mar;
      case 3:
        return strings.apr;
      case 4:
        return strings.may;
      case 5:
        return strings.jun;
      case 6:
        return strings.jul;
      case 7:
        return strings.aug;
      case 8:
        return strings.sep;
      case 9:
        return strings.oct;
      case 10:
        return strings.nov;
      case 11:
        return strings.dec;
      default:
        return null;
    }
  };

  return (
    <div
      ref={buttonRef}
      className={`${styles.saveButton}`}
      onMouseEnter={handleHover}
      onClick={handleSelect}
    >
      {saveText}
      {saveFile && (
        <span className={styles.saveDate}>{generateDate(saveFile.date)}</span>
      )}
    </div>
  );
};

export default SaveGame;
