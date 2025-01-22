import { useSelector } from "react-redux";
import { navigationSelector } from "../store/navigationSlice";
import { buttonGroups } from "../constants/buttonGroups";
import { handleArrowNavigation } from "../utils/buttonGroupKeyNavigation";
import useMenuOptions from "./useMenuOptions";
import useDispatchAbstractor from "./useDispatchAbstractor";
import { useEventHandlerContext } from "../context/EventHandlerContext";
import { useEffect } from "react";

const useKeyNavigation = (optionsPerRow) => {
  const menuOptions = useMenuOptions();
  const { hoveredOption, activeButtonGroup, keyPressed, lastKeyPressedTime } = useSelector(navigationSelector);
  const { handleHover, handleSelect, handleError, handleBack } = useEventHandlerContext();
  const { navigationFunctions } = useDispatchAbstractor();

  useEffect(() => {
    const handleKeyUp = () => {
      navigationFunctions.setKeyPressed(false);
    }
    
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const keyHandlers = {
    ArrowRight: () => handleArrowNavigation("right", hoveredOption, optionsPerRow, activeButtonGroup, buttonGroups, handleHover, menuOptions),
    ArrowLeft: () => handleArrowNavigation("left", hoveredOption, optionsPerRow, activeButtonGroup, buttonGroups, handleHover, menuOptions),
    ArrowDown: () => handleArrowNavigation("down", hoveredOption, optionsPerRow, activeButtonGroup, buttonGroups, handleHover, menuOptions),
    ArrowUp: () => handleArrowNavigation("up", hoveredOption, optionsPerRow, activeButtonGroup, buttonGroups, handleHover, menuOptions),
    Escape: handleBack,
    Backspace: handleError,
    Enter: () => handleSelect(),
  };

  const statsScrollCondition = (event) => {
    return activeButtonGroup === buttonGroups.STATS && (event.key === "ArrowDown" || event.key === "ArrowUp");
  }

  const handleKeyDown = (event) => {
    if (!keyPressed) {
      navigationFunctions.setLastKeyPressedTime(Date.now());
    } else if (Date.now() - lastKeyPressedTime > 200 && !statsScrollCondition(event))
      return;
    
      navigationFunctions.setKeyPressed(true); // Set the flag to prevent continuous keydown events
      const handler = keyHandlers[event.key];
      if (handler) handler();
  };

  return { handleKeyDown };
};

export default useKeyNavigation;
