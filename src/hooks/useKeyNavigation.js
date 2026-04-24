import { useReduxAbstractorContext } from "../context/ReduxAbstractorContext";
import { useEventHandlerContext } from "../context/EventHandlerContext";
import { useEffect, useState, useRef } from "react";
import { handleArrowNavigation } from "../utils/buttonGroupKeyNavigation";
import { buttonGroups } from "../constants/buttonGroups";
import { actionNames } from "../constants/actionNames";

const {BRIGHTNESS_ID, SCREENPOS_ID} = actionNames.DISPLAY;

const useKeyNavigation = (optionsPerRow) => {
  const { dispatchAbstractor, selectorAbstractor } = useReduxAbstractorContext();
  const { navigationFunctions } = dispatchAbstractor;
  const { hoveredOption, activeButtonGroup, keyPressed, lastKeyPressedTime, lastKeyUnpressedTime, bigHover } = selectorAbstractor.navigationState;

  const { handleHover, handleSelect, handleError, handleBack, handleSpecial } = useEventHandlerContext();
  const { updateParams, handleInput } = handleArrowNavigation(hoveredOption, activeButtonGroup, bigHover, handleHover, optionsPerRow);

  const [keyDownActive, setKeyDownActive] = useState(true);
  const [lastKey, setLastKey] = useState(null);

  // Track currently held arrow keys for diagonal map panning
  const heldKeysRef = useRef(new Set());

  useEffect(() => {
    updateParams(hoveredOption, activeButtonGroup, bigHover);
  }, [hoveredOption, activeButtonGroup, bigHover]);

  const statsScrollCondition = (event) => {
    return activeButtonGroup === buttonGroups.STATS && (event.key === "ArrowDown" || event.key === "ArrowUp");
  }

  const mapScrollCondition = (event) => {
    return activeButtonGroup === buttonGroups.MAP && (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "PageUp" || event.key === "PageDown");
  }

  const barCondition = (event) => {
    return activeButtonGroup === buttonGroups.DISPLAY && (event.key === "ArrowLeft" || event.key === "ArrowRight") && bigHover.active && bigHover.myId === BRIGHTNESS_ID;
  }

  const screenPosCondition = (event) => {
    return activeButtonGroup === buttonGroups.DISPLAY && (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "ArrowUp" || event.key === "ArrowDown") && bigHover.active && bigHover.myId === SCREENPOS_ID;
  }

  const getMapDiagonalDirection = (key) => {
    const held = heldKeysRef.current;
    held.add(key);
    const up = held.has("ArrowUp");
    const down = held.has("ArrowDown");
    const left = held.has("ArrowLeft");
    const right = held.has("ArrowRight");
    const { ARROWS } = actionNames;
    if (up && right) return ARROWS.DIRECTION_UP_RIGHT;
    if (up && left) return ARROWS.DIRECTION_UP_LEFT;
    if (down && right) return ARROWS.DIRECTION_DOWN_RIGHT;
    if (down && left) return ARROWS.DIRECTION_DOWN_LEFT;
    return null;
  };

  const keyHandlers = {
    ArrowRight: () => handleInput("right"),
    ArrowLeft: () => handleInput("left"),
    ArrowDown: () => handleInput("down"),
    ArrowUp: () => handleInput("up"),
    Escape: handleBack,
    Backspace: handleBack,
    Enter: () => handleSelect(),
    PageUp: () => handleSpecial("zoomIn"),
    PageDown: () => handleSpecial("zoomOut"),
  };

  const willNotAccept = (event) => {
    const delta = Date.now() - lastKeyPressedTime;
    return ( delta > 200 || event.key === lastKey ) && !statsScrollCondition(event) && !barCondition(event) && !screenPosCondition(event) && !mapScrollCondition(event);
  }

  const willUseDiagonal = (event) => mapScrollCondition(event) || screenPosCondition(event);

  const handleKeyDown = (event) => {
    if (!keyPressed) {
      navigationFunctions.setLastKeyPressedTime(Date.now());
    } else if ( willNotAccept(event) ) {
      setKeyDownActive(false);
      return;
    }
     // if (Date.now() - lastKeyUnpressedTime < 150) return;
    
      navigationFunctions.setKeyPressed(true); // Set the flag to prevent continuous keydown events

      // Diagonal map panning — check if two arrows are held simultaneously
      if (willUseDiagonal(event)) {
        const diagonal = getMapDiagonalDirection(event.key);
        if (diagonal) {
          handleHover(diagonal);
          setLastKey(event.key);
          return;
        }
      }

      const handler = keyHandlers[event.key];
      if (handler) handler();
      setLastKey(event.key);
  };

  const handleKeyUp = (event) => {
    heldKeysRef.current.delete(event.key);
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
