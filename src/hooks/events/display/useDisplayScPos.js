import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import useSoundManager from "../../useSoundManager";
import { useEffect } from "react";
import { actionNames } from "../../../constants/actionNames";
import { buttonGroups } from "../../../constants/buttonGroups";

const { DIRECTION_RIGHT, DIRECTION_LEFT, DIRECTION_UP, DIRECTION_DOWN } = actionNames.ARROWS;
const { SCREENPOS_ID, CHANGING_POS } = actionNames.DISPLAY;

const MAX_VIEWPORT_RATIO = 0.5;

const useDisplayScPos = (globalHookFunctions) => {
  const { toggleBigHover } = globalHookFunctions;
  const { playSelect } = useSoundManager();

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
    const isInX = direction === DIRECTION_LEFT || direction === DIRECTION_RIGHT;
    const isInY = direction === DIRECTION_UP || direction === DIRECTION_DOWN;
    
    const sign = direction === DIRECTION_LEFT || direction === DIRECTION_UP ? -1 : 1;

    const { x: oldX, y: oldY } = displaySettings[SCREENPOS_ID];
    let newX = oldX;
    let newY = oldY;

    if (isInX) newX = oldX + sign;
    if (isInY) newY = oldY + sign;

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