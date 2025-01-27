import { useReduxAbstractorContext } from "../../context/ReduxAbstractorContext";
import { useState, useEffect } from "react";
import styles from "./Cursor.module.css";
import { actionNames } from "../../constants/actionNames";

const { SCREENPOS_ID } = actionNames.DISPLAY;

const Cursor = () => {
  const { selectorAbstractor } = useReduxAbstractorContext();
  const { displaySettings } = selectorAbstractor.miscState;
  const { bigHover } = selectorAbstractor.navigationState;
  const { positionStyle, clipPathStyle } = selectorAbstractor.cursorState;

  const { top, left } = positionStyle;

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [lastXY, setLastXY] = useState({x:0,y:0});
  const [finalPosition, setFinalPosition] = useState({});
  
  const isChangingScreenPos = () => {
    return bigHover.active && bigHover.myId === SCREENPOS_ID;
  };

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
