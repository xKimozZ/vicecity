import { useDispatch, useSelector } from "react-redux";
import { navigationSelector } from "../store/navigationSlice";
import { buttonGroups } from "../constants/buttonGroups";
import { handleArrowNavigation } from "../utils/buttonGroupKeyNavigation";
import useMenuOptions from "./useMenuOptions";
import { setKeyPressed } from "../store/navigationSlice";
import { useEventHandlerContext } from "../context/EventHandlerContext";

const useKeyNavigation = (optionsPerRow ) => {
  const menuOptions = useMenuOptions();
  const { hoveredOption, activeButtonGroup, keyPressed } = useSelector(navigationSelector);
  const { handleHover, handleSelect, handleError, handleBack } = useEventHandlerContext();
  const dispatch = useDispatch();

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
      dispatch(setKeyPressed(true)); // Set the flag to prevent continuous keydown events
      const handler = keyHandlers[event.key];
      if (handler) handler();
  };

  return { handleKeyDown };
};

export default useKeyNavigation;
