import React, { useState, useEffect, useRef } from "react";
import styles from "./Bar.module.css";
import { useEventHandlerContext } from "../../context/EventHandlerContext";
import { actionNames } from "../../constants/actionNames";
import Hoverable from "../Hoverable/Hoverable";
import { useReduxAbstractorContext } from "../../context/ReduxAbstractorContext";

const { DIRECTION_LEFT, DIRECTION_RIGHT } = actionNames.ARROWS;

const Bar = ({
  value = 0.6,
  barCount = 16,
  buttonNumber = 1,
  buttonGroup = 1,
  actions = { trigger: "brightness" },
  id = "bar",
  parentId = "bar-parent",
}) => {
  const { selectorAbstractor } = useReduxAbstractorContext();
  const { hoveredOption , activeButtonGroup ,bigHover } = selectorAbstractor.navigationState;
  
  const { handleSpecial, handleHover } = useEventHandlerContext();

  const [levels, setLevels] = useState([]);
  const [filled, setFilled] = useState();
  const barRef = useRef(null);

  const barNotHovered = (buttonGroup !== activeButtonGroup || hoveredOption !== buttonNumber || !bigHover.active);
  const hoverableBehaviorActive = () => barNotHovered;

  useEffect(() => {
    const filledBars = Math.round(value * 16);
    setFilled(filledBars);
  }, [value]);

  useEffect(() => {
    const generatedLevels = Array.from({ length: barCount }, (_, index) => {
      return 0; // Trend-like increasing heights
    });

    setLevels(generatedLevels);
  }, [barCount]);

  useEffect(() => {

    const handleClick = (event) => {
      const parentElement = barRef.current;
      const clickPositionX = ( event.clientX ) - parentElement.getBoundingClientRect().left;
      if (clickPositionX < -30 || clickPositionX > 30 + parentElement.offsetWidth) return;
  
      let barNumber = Math.ceil(clickPositionX / (parentElement.offsetWidth) * barCount);
      if (barNumber < 0 || barNumber === -0) barNumber = 0;
      if (barNumber > barCount) barNumber = barCount;
      handleSpecial(barNumber);
    };

    const handleWheel = (event) => {
      if (!barNotHovered) { 
        if (event.deltaY !== 0) event.deltaY > 0 ? handleHover(DIRECTION_LEFT) : handleHover(DIRECTION_RIGHT);
        if (event.deltaX !== 0) event.deltaX > 0 ? handleHover(DIRECTION_LEFT) : handleHover(DIRECTION_RIGHT);
      }
      event.stopPropagation();
    };

    if (!barNotHovered) {
      window.addEventListener("wheel", handleWheel);
      window.addEventListener("click", handleClick);
    }
    
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("click", handleClick);
    }
  }, [barNotHovered, handleSpecial, value, barRef]);

  return (
    <Hoverable
      buttonNumber={buttonNumber}
      buttonGroup={buttonGroup}
      actions={actions}
      id={id}
      parentId={parentId}
      renderById={true}
      activeCondition={hoverableBehaviorActive}
    >
      <div className={styles.soundBarContainer} ref={barRef}>
        {levels.map((level, index) => (
          <div
            key={index}
            className={styles.bar}
            style={{
              backgroundColor: index < filled ? "var(--cyan)" : "var(--navy)",
            }}
          />
        ))}
      </div>
    </Hoverable>
  );
};

export default Bar;
