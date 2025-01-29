import { useReduxAbstractorContext } from "../../context/ReduxAbstractorContext";
import { useState, useEffect } from "react";
import styles from "./Cursor.module.css";
import { actionNames } from "../../constants/actionNames";

const { SCREENPOS_ACTION } = actionNames.DISPLAY;

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
    return bigHover.active && bigHover.myId === SCREENPOS_ACTION;
  };

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    if ( isChangingScreenPos() ) window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isChangingScreenPos]);

  useEffect(() => {
    if (isChangingScreenPos()) {
      setFinalPosition({position:"absolute", 
      transform: `translate(${displaySettings[SCREENPOS_ACTION].x - lastXY.x}px, ${displaySettings[SCREENPOS_ACTION].y - lastXY.y}px)`});
      return;
    } else {
      setLastXY({x: displaySettings[SCREENPOS_ACTION].x, y: displaySettings[SCREENPOS_ACTION].y});
      setFinalPosition({});
    }
  }, [bigHover, viewportWidth, viewportHeight, top, left, displaySettings]);

  const finalStyle={...positionStyle, ...clipPathStyle, ...finalPosition};

  return <div className={styles.cursorBackground} style={{...finalStyle}} />;
};

export default Cursor;
