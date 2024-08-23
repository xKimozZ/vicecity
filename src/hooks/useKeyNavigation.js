import { useDispatch, useSelector } from "react-redux";
import { navigationSelector, setHoveredOption } from "../store/navigationSlice";
import useEventHandler from './useEventHandler';
import { menuOptions } from "../constants/menuOptions";

const useKeyNavigation = ( optionsPerRow ) => {
    const dispatch = useDispatch();
    const {hoveredOption} = useSelector(navigationSelector);
    const { handleHover, handleSelect, handleError, handleBack, handleInfo } = useEventHandler();

    const handleKeyDown = (event) => {
        const firstRowStart = 1;
        const firstRowEnd = optionsPerRow[0];
        const secondRowStart = optionsPerRow[1] + 1;
        const secondRowEnd = menuOptions.length;
        const vertical = menuOptions.length / 2;
    
        if (event.key === "Escape") {
          handleBack();
        }
        if (event.key === "Backspace") {
          handleError();
        }
        if (event.key === "Enter") {
          handleSelect();
        }
        if (event.key === "ArrowRight") {
          handleHover();
          if (hoveredOption + 1 > secondRowEnd)
            dispatch(setHoveredOption( secondRowStart ));
          else if (hoveredOption + 1 === firstRowEnd + 1)
            dispatch(setHoveredOption( firstRowStart ));
          else
          dispatch(setHoveredOption(hoveredOption+1));
        }
        if (event.key === "ArrowLeft") {
          handleHover();
          if (hoveredOption - 1 < firstRowStart)
            dispatch(setHoveredOption(firstRowEnd));
          else if (hoveredOption - 1 === secondRowStart - 1)
            dispatch(setHoveredOption( secondRowEnd ));
            else
          dispatch(setHoveredOption(hoveredOption - 1));
        }
        if (event.key === "ArrowDown") {
          handleHover();
          if (hoveredOption + vertical > secondRowEnd)
            dispatch(setHoveredOption( hoveredOption - vertical));
          else
          dispatch(setHoveredOption(hoveredOption + vertical));
        }
        if (event.key === "ArrowUp") {
          handleHover();
          if (hoveredOption - vertical < firstRowStart)
            dispatch(setHoveredOption(hoveredOption + vertical));
          else
          dispatch(setHoveredOption(hoveredOption- vertical));
        }
      };
    
    

  return {
    handleKeyDown,
  };
};

export default useKeyNavigation;