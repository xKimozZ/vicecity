import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import useSoundManager from "../../useSoundManager";
import { actionNames } from "../../../constants/actionNames";

const { DIRECTION_RIGHT, DIRECTION_LEFT } = actionNames.ARROWS;
const { RADAR_ID, RADAR_MAPBLIPS, RADAR_OFF } = actionNames.DISPLAY;

const useDisplayGenerics = (globalHookFunctions) => {
  const { toggleBigHover } = globalHookFunctions;
  const { playHover, playSelect } = useSoundManager();

  const { dispatchAbstractor, selectorAbstractor } = useReduxAbstractorContext();
  const { miscFunctions } = dispatchAbstractor;
  const { currentActions } = selectorAbstractor.navigationState;
  const { displaySettings } = selectorAbstractor.miscState;

  const toggleRadarChangingMode = () => {
    playHover();
    toggleBigHover();
  }

  const toggleGenericOption = () => {
    const optionId = currentActions.trigger;
    const newDisplaySettings = { ...displaySettings, [optionId]: !displaySettings[optionId] };
    miscFunctions.setDisplaySettings(newDisplaySettings);
    playSelect();
  }

  const cycleRadarOptions = (direction) => {
    // Only left or right allowed here!
    let sign;
    if (direction === DIRECTION_LEFT) sign = -1; else if (direction === DIRECTION_RIGHT) sign = 1; else return;

    const currentOption = displaySettings[RADAR_ID];
    let newOption = currentOption + sign;

    if (newOption < RADAR_MAPBLIPS) newOption = RADAR_OFF;
    if (newOption > RADAR_OFF) newOption = RADAR_MAPBLIPS;
    
    const newDisplaySettings = {...displaySettings,[RADAR_ID]: newOption};
    miscFunctions.setDisplaySettings(newDisplaySettings);

    playSelect();
  }

  return { toggleRadarChangingMode, toggleGenericOption, cycleRadarOptions };
};

export default useDisplayGenerics;