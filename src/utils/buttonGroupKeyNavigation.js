
// For main menu when not locked on to a screen
export const getNavigationLimits = (optionsPerRow, menuOptions) => {
  const firstRowStart = 1;
  const firstRowEnd = optionsPerRow[0];
  const secondRowStart = optionsPerRow[1] + 1;
  const secondRowEnd = menuOptions.length;
  const vertical = menuOptions.length / 2;
  return { firstRowStart, firstRowEnd, secondRowStart, secondRowEnd, vertical };
};


export const handleArrowNavigation = (
  direction,
  hoveredOption,
  optionsPerRow,
  activeButtonGroup,
  buttonGroups,
  handleHover,
  menuOptions,
) => {
  const { firstRowStart, firstRowEnd, secondRowStart, secondRowEnd, vertical } =
    getNavigationLimits(optionsPerRow, menuOptions);

    // load menu handling
  if (activeButtonGroup === buttonGroups.LOAD) {
    if (direction === "down") {
      if (hoveredOption > 2)
        {
          if (hoveredOption + 1 > 10) handleHover(3);
          else handleHover(hoveredOption + 1);
        }
        else if (hoveredOption + 1 > 2) handleHover(1);
        else handleHover(hoveredOption + 1);
    }
    if (direction === "up") {
      if (hoveredOption > 2)
        {
          if (hoveredOption - 1 < 3) handleHover(9);
          else handleHover(hoveredOption - 1);
        }
        else if (hoveredOption - 1 < 1) handleHover(2);
        else handleHover(hoveredOption - 1);
    }
    return;
  }

  // language menu handling
  if (activeButtonGroup === buttonGroups.LANGUAGE) {
    if (direction === "down") {
      if (hoveredOption + 1 > 5) handleHover(1);
      else handleHover(hoveredOption + 1);
    }
    if (direction === "up") {
      if (hoveredOption - 1 < 1) handleHover(5);
      else handleHover(hoveredOption - 1);
    }
    return;
  }

    // stats menu handling
    if (activeButtonGroup === buttonGroups.STATS) {
      if (direction === "down") {
        handleHover(1);
      }
      if (direction === "up") {
        handleHover(0);
      }
      return;
    }

  // main menu handling
  if (activeButtonGroup === buttonGroups.MAIN) {
    if (direction === "right") {
      if (hoveredOption + 1 > secondRowEnd) handleHover(secondRowStart);
      else if (hoveredOption + 1 === firstRowEnd + 1)
        handleHover(firstRowStart);
      else handleHover(hoveredOption + 1);
    }

    if (direction === "left") {
      if (hoveredOption - 1 < firstRowStart) handleHover(firstRowEnd);
      else if (hoveredOption - 1 === secondRowStart - 1)
        handleHover(secondRowEnd);
      else handleHover(hoveredOption - 1);
    }

    if (direction === "down") {
      if (hoveredOption + vertical > secondRowEnd)
        handleHover(hoveredOption - vertical);
      else handleHover(hoveredOption + vertical);
    }

    if (direction === "up") {
      if (hoveredOption - vertical < firstRowStart)
        handleHover(hoveredOption + vertical);
      else handleHover(hoveredOption - vertical);
    }
    return;
  }
};
