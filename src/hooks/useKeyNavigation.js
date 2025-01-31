import { useReduxAbstractorContext } from "../context/ReduxAbstractorContext";
import { useEventHandlerContext } from "../context/EventHandlerContext";
import { useEffect } from "react";
import { handleArrowNavigation } from "../utils/buttonGroupKeyNavigation";
import { buttonGroups } from "../constants/buttonGroups";
import { actionNames } from "../constants/actionNames";

const {BRIGHTNESS_ID, SCREENPOS_ID} = actionNames.DISPLAY;

const useKeyNavigation = (optionsPerRow) => {
  const { dispatchAbstractor, selectorAbstractor } = useReduxAbstractorContext();
  const { navigationFunctions } = dispatchAbstractor;
  const { hoveredOption, activeButtonGroup, keyPressed, lastKeyPressedTime, lastKeyUnpressedTime, bigHover } = selectorAbstractor.navigationState;

  const { handleHover, handleSelect, handleError, handleBack } = useEventHandlerContext();
  const { updateParams, handleInput } = handleArrowNavigation(hoveredOption, activeButtonGroup, bigHover, handleHover, optionsPerRow);

  useEffect(() => {
    updateParams(hoveredOption, activeButtonGroup, bigHover);
  }, [hoveredOption, activeButtonGroup, bigHover]);

  const statsScrollCondition = (event) => {
    return activeButtonGroup === buttonGroups.STATS && (event.key === "ArrowDown" || event.key === "ArrowUp");
  }

  const barCondition = (event) => {
    return activeButtonGroup === buttonGroups.DISPLAY && (event.key === "ArrowLeft" || event.key === "ArrowRight") && bigHover.active && bigHover.myId === BRIGHTNESS_ID;
  }

  const screenPosCondition = (event) => {
    return activeButtonGroup === buttonGroups.DISPLAY && (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "ArrowUp" || event.key === "ArrowDown") && bigHover.active && bigHover.myId === SCREENPOS_ID;
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

  const willNotAccept = (event) => {
    return Date.now() - lastKeyPressedTime > 200 && !statsScrollCondition(event) && !barCondition(event) && !screenPosCondition(event);
  }

  const handleKeyDown = (event) => {
    if (!keyPressed) {
      navigationFunctions.setLastKeyPressedTime(Date.now());
    } else if ( willNotAccept(event) ) return;

     // if (Date.now() - lastKeyUnpressedTime < 150) return;
    
      navigationFunctions.setKeyPressed(true); // Set the flag to prevent continuous keydown events
      const handler = keyHandlers[event.key];
      if (handler) handler();
  };

  const handleKeyUp = () => {
    navigationFunctions.setKeyPressed(false);
  }

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [dispatchAbstractor, selectorAbstractor, handleKeyUp, handleKeyDown]);

  return { handleKeyDown };
};


export default useKeyNavigation;
