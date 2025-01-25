import styles from "./Cursor.module.css";
import { cursorSelector } from "../../store/cursorSlice";
import { useSelector } from "react-redux";
import { miscSelector } from "../../store/miscSlice";
import { navigationSelector } from "../../store/navigationSlice";
import { actionNames } from "../../constants/actionNames";
import { useState, useEffect } from "react";

const Cursor = () => {
  const { positionStyle, clipPathStyle } = useSelector(cursorSelector);
  const { displaySettings } = useSelector(miscSelector);
  const { bigHover } = useSelector(navigationSelector);
  const { SCREENPOS_ID } = actionNames.DISPLAY;
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [lastXY, setLastXY] = useState({x:0,y:0});
  const { top, left } = positionStyle;

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isChangingScreenPos = () => {
    return bigHover.active && bigHover.myId === SCREENPOS_ID;
  };

  const [finalPosition, setFinalPosition] = useState({});

  useEffect(() => {
    if (isChangingScreenPos()) {
      setFinalPosition({position:"absolute", 
      transform: `translate(${displaySettings[SCREENPOS_ID].x - lastXY.x}px, ${displaySettings[SCREENPOS_ID].y - lastXY.y}px)`});
      return;
    } else {
      setLastXY({x: displaySettings[SCREENPOS_ID].x, y: displaySettings[SCREENPOS_ID].y});
      setFinalPosition({});
    }
  }, [bigHover, viewportWidth, viewportHeight, top, left, displaySettings]);

  const finalStyle={...positionStyle, ...clipPathStyle, ...finalPosition};
  return <div className={styles.cursorBackground} style={{...finalStyle}} />;
};

export default Cursor;
