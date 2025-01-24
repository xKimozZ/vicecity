import { actionNames } from "../constants/actionNames";
import { buttonGroups, buttonIndices } from "../constants/buttonGroups";
import menuOptions from "../constants/menuOptions";

// For main menu when not locked on to a screen
export const getNavigationLimits = (optionsPerRow) => {
  const firstRowStart = 1;
  const firstRowEnd = optionsPerRow[0];
  const secondRowStart = optionsPerRow[1] + 1;
  const secondRowEnd = menuOptions.length;
  const vertical = menuOptions.length / 2;
  return { firstRowStart, firstRowEnd, secondRowStart, secondRowEnd, vertical };
};

export const handleArrowNavigation = (initialHover, initialGroup, handleHover, optionsPerRow) => {
  const { firstRowStart, firstRowEnd, secondRowStart, secondRowEnd, vertical } = getNavigationLimits(optionsPerRow);

  var hoveredOption = initialHover;
  var activeButtonGroup = initialGroup;

  const updateParams = (newHoveredOption, activeButtonGroup) => {
    hoveredOption = newHoveredOption;
    activeButtonGroup = activeButtonGroup;
  };

  const handleInput = (direction) => {
    switch (activeButtonGroup) {
      case buttonGroups.LOAD:
        const { PHASE1_LIST_START, PHASE1_LIST_END, PHASE2_LIST_START, PHASE2_LIST_END } = buttonIndices.LOAD;
        const insidePhase2 = hoveredOption >= PHASE2_LIST_START;
        switch (direction) {
          case "down":
            if (insidePhase2) {
              if (hoveredOption + 1 > PHASE2_LIST_END)
                handleHover(PHASE2_LIST_START);
              else handleHover(hoveredOption + 1);
            } else if (hoveredOption + 1 > PHASE1_LIST_END)
              handleHover(PHASE1_LIST_START);
            else handleHover(hoveredOption + 1);
            break;
          case "up":
            if (insidePhase2) {
              if (hoveredOption - 1 < PHASE2_LIST_START)
                handleHover(PHASE2_LIST_END);
              else handleHover(hoveredOption - 1);
            } else if (hoveredOption - 1 < PHASE1_LIST_START)
              handleHover(PHASE1_LIST_END);
            else handleHover(hoveredOption - 1);
            break;
        }
        return;

      case buttonGroups.LANGUAGE:
        {
          const {LIST_START, LIST_END} = buttonIndices.LANGUAGE;
          if (direction === "down") {
            if (hoveredOption + 1 > LIST_END) handleHover(LIST_START);
            else handleHover(hoveredOption + 1);
          } else if (direction === "up") {
            if (hoveredOption - 1 < LIST_START) handleHover(LIST_END);
            else handleHover(hoveredOption - 1);
          }
          return;
        }

      case buttonGroups.STATS:
        if (direction === "down") {
          handleHover(1);
        } else if (direction === "up") {
          handleHover(0);
        }
        return;

      case buttonGroups.DISPLAY:
        {
          const { LIST_START, LIST_END } = buttonIndices.DISPLAY;
        if (direction === "down") {
          if (hoveredOption + 1 > LIST_END) handleHover(LIST_START);
          else handleHover(hoveredOption + 1);
        } else if (direction === "up") {
          if (hoveredOption - 1 < LIST_START) handleHover(LIST_END);
          else handleHover(hoveredOption - 1);
        } else if (direction === "left") {
          handleHover(actionNames.DISPLAY.DIRECTION_LEFT);
        } else if (direction === "right") {
          handleHover(actionNames.DISPLAY.DIRECTION_RIGHT);
        }
        }
        return;

      case buttonGroups.MAIN:
        if (direction === "right") {
          if (hoveredOption + 1 > secondRowEnd) handleHover(secondRowStart);
          else if (hoveredOption + 1 === firstRowEnd + 1)
            handleHover(firstRowStart);
          else handleHover(hoveredOption + 1);
        } else if (direction === "left") {
          if (hoveredOption - 1 < firstRowStart) handleHover(firstRowEnd);
          else if (hoveredOption - 1 === secondRowStart - 1)
            handleHover(secondRowEnd);
          else handleHover(hoveredOption - 1);
        } else if (direction === "down") {
          if (hoveredOption + vertical > secondRowEnd)
            handleHover(hoveredOption - vertical);
          else handleHover(hoveredOption + vertical);
        } else if (direction === "up") {
          if (hoveredOption - vertical < firstRowStart)
            handleHover(hoveredOption + vertical);
          else handleHover(hoveredOption - vertical);
        }
        return;
    }
  };

  return { handleInput, updateParams };
};
