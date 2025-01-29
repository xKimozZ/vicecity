import React, { useState, useEffect } from "react";
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

  // Dragging stuff
  const [dragStart, setDragStart] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [dragCurrent, setDragCurrent] = useState(null);
  const [lastDragTime, setLastDragTime] = useState(0);

  const barNotHovered = (buttonGroup !== activeButtonGroup || hoveredOption !== buttonNumber || !bigHover.active);
  const hoverableBehaviorActive = () => !bigHover.active || hoveredOption !== buttonNumber;

  useEffect(() => {
    const filledBars = Math.round(value * 16);
    setFilled(filledBars);
  }, [value]);

  useEffect(() => {
    const generatedLevels = Array.from({ length: barCount }, (_, index) => {
      return 24 + index * 6; // Trend-like increasing heights
    });

    setLevels(generatedLevels);
  }, [barCount]);

  const handleWheel = (event) => {
    if (!hoverableBehaviorActive()) { 
      if (event.deltaY !== 0) event.deltaY > 0 ? handleHover(DIRECTION_LEFT) : handleHover(DIRECTION_RIGHT);
      if (event.deltaX !== 0) event.deltaX > 0 ? handleHover(DIRECTION_LEFT) : handleHover(DIRECTION_RIGHT);
    }
    event.stopPropagation();
  };

  const handleMousedown = (event) => {
    setDragStart(event.clientX);
    setDragging(true);
    event.stopPropagation();
  };

  const handleMousemove = (event) => {
    if (Date.now() - lastDragTime > 60)
    setDragCurrent(event.clientX);
  event.stopPropagation();
  }

  const handleMouseup = (event) => {
    setDragging(false);
    setLastDragTime(0);
    event.stopPropagation();
  }

  useEffect(() => {
    if (barNotHovered) return;

    if (dragging &&  Date.now() - lastDragTime > 40) {
      const diffX = dragCurrent - dragStart;
      const absDiffX = Math.abs(diffX);
      if (absDiffX > 15) {
        if (diffX > 0) handleHover(DIRECTION_RIGHT);
        else handleHover(DIRECTION_LEFT);
      }
      setLastDragTime(Date.now());
    }
  }, [dragging, dragStart, dragCurrent, lastDragTime, barNotHovered]);

  useEffect(() => {
    window.addEventListener("mousedown", handleMousedown);
    window.addEventListener("mousemove", handleMousemove);
    window.addEventListener("mouseup", handleMouseup); 
    
    return () => {
      window.removeEventListener("mousedown", handleMousedown);
      window.removeEventListener("mousemove", handleMousemove);
      window.removeEventListener("mouseup", handleMouseup); 
    }
  }, []);

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
      <div
        onWheel={handleWheel}
        className={styles.soundBarContainer}
      >
        {levels.map((level, index) => (
          <div
            key={index}
            className={styles.bar}
            onClick={() => handleSpecial(index + 1)}
            style={{
              height: `${level}px`, // Set height based on the generated levels
              backgroundColor: index < filled ? "#61c2f7" : "#1b5982",
            }}
          />
        ))}
      </div>
    </Hoverable>
  );
};

export default Bar;
