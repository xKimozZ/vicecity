import { useSelector } from "react-redux";
import { navigationSelector } from "../store/navigationSlice";
import useEventHandler from "./useEventHandler";
import { buttonGroups } from "../constants/buttonGroups";
import useMenuOptions from "./useMenuOptions";

const useKeyNavigation = (optionsPerRow) => {
  const menuOptions = useMenuOptions();
  const { hoveredOption, activeButtonGroup } = useSelector(navigationSelector);
  const { handleHover, handleSelect, handleError, handleBack } = useEventHandler();

  const getNavigationLimits = () => {
    const firstRowStart = 1;
    const firstRowEnd = optionsPerRow[0];
    const secondRowStart = optionsPerRow[1] + 1;
    const secondRowEnd = menuOptions.length;
    const vertical = menuOptions.length / 2;
    return { firstRowStart, firstRowEnd, secondRowStart, secondRowEnd, vertical };
  };

  const handleArrowNavigation = (direction) => {
    const { firstRowStart, firstRowEnd, secondRowStart, secondRowEnd, vertical } = getNavigationLimits();

    if (activeButtonGroup !== buttonGroups.MAIN) {
      if (direction === "down") {
        if ( hoveredOption + 1 > 5)
          handleHover(1);
        else
          handleHover( hoveredOption + 1); 
      };
      if (direction === "up") {
        if ( hoveredOption - 1 < 1)
          handleHover(5);
        else
          handleHover( hoveredOption - 1); 
      };
      return;
    }

    if (direction === "right") {
      if (hoveredOption + 1 > secondRowEnd) handleHover(secondRowStart);
      else if (hoveredOption + 1 === firstRowEnd + 1) handleHover(firstRowStart);
      else handleHover(hoveredOption + 1);
    }

    if (direction === "left") {
      if (hoveredOption - 1 < firstRowStart) handleHover(firstRowEnd);
      else if (hoveredOption - 1 === secondRowStart - 1) handleHover(secondRowEnd);
      else handleHover(hoveredOption - 1);
    }

    if (direction === "down") {
      if (hoveredOption + vertical > secondRowEnd) handleHover(hoveredOption - vertical);
      else handleHover(hoveredOption + vertical);
    }

    if (direction === "up") {
      if (hoveredOption - vertical < firstRowStart) handleHover(hoveredOption + vertical);
      else handleHover(hoveredOption - vertical);
    }
  };

  const keyHandlers = {
    ArrowRight: () => handleArrowNavigation("right"),
    ArrowLeft: () => handleArrowNavigation("left"),
    ArrowDown: () => handleArrowNavigation("down"),
    ArrowUp: () => handleArrowNavigation("up"),
    Escape: handleBack,
    Backspace: handleError,
    Enter: () => handleSelect(),
  };

  const handleKeyDown = (event) => {
    const handler = keyHandlers[event.key];
    if (handler) handler();
  };

  return { handleKeyDown };
};

export default useKeyNavigation;
