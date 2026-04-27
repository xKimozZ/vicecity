import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import { useEffect } from "react";
import { actionNames } from "../../../constants/actionNames";
import { buttonGroups } from "../../../constants/buttonGroups";

const {
  DIRECTION_RIGHT,
  DIRECTION_LEFT,
  DIRECTION_UP,
  DIRECTION_DOWN,
  DIRECTION_UP_RIGHT,
  DIRECTION_UP_LEFT,
  DIRECTION_DOWN_RIGHT,
  DIRECTION_DOWN_LEFT,
} = actionNames.ARROWS;
const { SCREENPOS_ID, CHANGING_POS } = actionNames.DISPLAY;

const MAX_VIEWPORT_RATIO = 0.5;

const useDisplayScPos = (globalHookFunctions) => {
  const { toggleBigHover, playSelect } = globalHookFunctions;

  const { dispatchAbstractor, selectorAbstractor } = useReduxAbstractorContext();

  const { miscFunctions } = dispatchAbstractor;
  const { bigHover, activeButtonGroup } = selectorAbstractor.navigationState;
  const { displaySettings } = selectorAbstractor.miscState;

  const getScreenLimits = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    return {
      x: viewportWidth * MAX_VIEWPORT_RATIO,
      y: viewportHeight * MAX_VIEWPORT_RATIO,
    };
  };

  const toggleScreenPosMode = () => {
    // If just selected, create the border, else toggle off and delete it
    let isChanging = bigHover.active ? false : true;
    miscFunctions.setDisplaySettings({...displaySettings, [CHANGING_POS]: isChanging});
    
    toggleBigHover();
    playSelect();
  };

  const changeScreenPos = (direction) => {
    const { x: oldX, y: oldY } = displaySettings[SCREENPOS_ID];
    let newX = oldX;
    let newY = oldY;

    switch (direction) {
      case DIRECTION_UP:
        newY = oldY - 1;
        break;
      case DIRECTION_UP_RIGHT:
        newY = oldY - 1;
        newX = oldX + 1;
        break;
      case DIRECTION_UP_LEFT:
        newY = oldY - 1;
        newX = oldX - 1;
        break;
      case DIRECTION_DOWN:
        newY = oldY + 1;
        break;
      case DIRECTION_DOWN_RIGHT:
        newY = oldY + 1;
        newX = oldX + 1;
        break;
      case DIRECTION_DOWN_LEFT:
        newY = oldY + 1;
        newX = oldX - 1;
        break;
      case DIRECTION_LEFT:
        newX = oldX - 1;
        break;
      case DIRECTION_RIGHT:
        newX = oldX + 1;
        break;
    }

    const {x: limitX, y: limitY} = getScreenLimits();

    if (Math.abs(newX) > limitX || Math.abs(newY) > limitY ) return;

    const newOption = { x: newX, y: newY };

    const newDisplaySettings = {
      ...displaySettings,
      [SCREENPOS_ID]: newOption,
    };
    miscFunctions.setDisplaySettings(newDisplaySettings);
  };

  // Did user exit the menu or otherwise clicked on another option thus should cancel the screen position mode?
  useEffect(() => {
    if (activeButtonGroup !== buttonGroups.DISPLAY || !bigHover.active)
      miscFunctions.setDisplaySettings({...displaySettings, [CHANGING_POS]: false});
  }, [activeButtonGroup, bigHover]);

  return { toggleScreenPosMode, changeScreenPos };
};

export default useDisplayScPos;