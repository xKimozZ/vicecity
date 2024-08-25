
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
