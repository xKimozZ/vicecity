import { useReduxAbstractorContext } from "../context/ReduxAbstractorContext";
import { useEventHandlerContext } from "../context/EventHandlerContext";
import { useEffect, useState } from "react";
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

  const [keyDownActive, setKeyDownActive] = useState(true);
  const [lastKey, setLastKey] = useState(null);

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
    const delta = Date.now() - lastKeyPressedTime;
    return ( delta > 200 || event.key === lastKey ) && !statsScrollCondition(event) && !barCondition(event) && !screenPosCondition(event);
  }

  const handleKeyDown = (event) => {
    if (!keyPressed) {
      navigationFunctions.setLastKeyPressedTime(Date.now());
    } else if ( willNotAccept(event) ) {
      setKeyDownActive(false);
      return;
    }
     // if (Date.now() - lastKeyUnpressedTime < 150) return;
    
      navigationFunctions.setKeyPressed(true); // Set the flag to prevent continuous keydown events
      const handler = keyHandlers[event.key];
      if (handler) handler();
      setLastKey(event.key);
  };

  const handleKeyUp = () => {
    navigationFunctions.setKeyPressed(false);
    setKeyDownActive(true);
  }

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    keyDownActive && window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [dispatchAbstractor, selectorAbstractor, handleKeyUp, handleKeyDown]);

  return { handleKeyDown };
};


export default useKeyNavigation;
