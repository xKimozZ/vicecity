import { useSelector } from "react-redux";
import { navigationSelector } from "../store/navigationSlice";
import { buttonGroups } from "../constants/buttonGroups";
import { handleArrowNavigation } from "../utils/buttonGroupKeyNavigation";
import useDispatchAbstractor from "./useDispatchAbstractor";
import { useEventHandlerContext } from "../context/EventHandlerContext";
import { useEffect } from "react";
import { actionNames } from "../constants/actionNames";

const {BRIGHTNESS_ID} = actionNames.DISPLAY;

const useKeyNavigation = (optionsPerRow) => {
  const { hoveredOption, activeButtonGroup, keyPressed, lastKeyPressedTime, lastKeyUnpressedTime, bigHover } = useSelector(navigationSelector);
  const { handleHover, handleSelect, handleError, handleBack } = useEventHandlerContext();
  const { navigationFunctions } = useDispatchAbstractor();
  const { updateParams, handleInput } = handleArrowNavigation(hoveredOption, activeButtonGroup, handleHover, optionsPerRow);

  useEffect(() => {
    const handleKeyUp = () => {
      navigationFunctions.setKeyPressed(false);
    }
    
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    updateParams(hoveredOption, activeButtonGroup);
  }, [hoveredOption, activeButtonGroup]);

  const statsScrollCondition = (event) => {
    return activeButtonGroup === buttonGroups.STATS && (event.key === "ArrowDown" || event.key === "ArrowUp");
  }

  const barCondition = (event) => {
    return activeButtonGroup === buttonGroups.DISPLAY && (event.key === "ArrowLeft" || event.key === "ArrowRight") && bigHover.active && bigHover.myId === BRIGHTNESS_ID;
  }

  const keyHandlers = {
    ArrowRight: () => handleInput("right"),
    ArrowLeft: () => handleInput("left"),
    ArrowDown: () => handleInput("down"),
    ArrowUp: () => handleInput("up"),
    Escape: handleBack,
    Backspace: handleBack,
    Enter: () => handleSelect(),
  };

  const handleKeyDown = (event) => {
    if (!keyPressed) {
      navigationFunctions.setLastKeyPressedTime(Date.now());
    } else if ( Date.now() - lastKeyPressedTime > 200 && !statsScrollCondition(event) && !barCondition(event)) return;

     // if (Date.now() - lastKeyUnpressedTime < 150) return;
    
      navigationFunctions.setKeyPressed(true); // Set the flag to prevent continuous keydown events
      const handler = keyHandlers[event.key];
      if (handler) handler();
  };

  return { handleKeyDown };
};

export default useKeyNavigation;
