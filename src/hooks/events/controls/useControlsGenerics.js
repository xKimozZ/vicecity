import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import useSoundManager from "../../useSoundManager";
import { actionNames } from "../../../constants/actionNames";

const { DIRECTION_RIGHT, DIRECTION_LEFT } = actionNames.ARROWS;
const { CONFIG_ID, MODE_ID, CONFIG_1, CONFIG_2, CONFIG_3, CONFIG_4, MODE_CAR, MODE_FOOT } = actionNames.CONTROLS;

const useControlsGenerics = (globalHookFunctions) => {
  const { toggleBigHover } = globalHookFunctions;
  const { playHover, playSelect } = useSoundManager();

  const { dispatchAbstractor, selectorAbstractor } = useReduxAbstractorContext();
  const { miscFunctions } = dispatchAbstractor;
  const { currentActions } = selectorAbstractor.navigationState;
  const { controlsSettings } = selectorAbstractor.miscState;

  const toggleConfigChangingMode = () => {
    playHover();
    toggleBigHover();
  }

  const toggleGenericOption = () => {
    const optionId = currentActions.trigger;
    const newControlsSettings = { ...controlsSettings, [optionId]: !controlsSettings[optionId] };
    miscFunctions.setControlsSettings(newControlsSettings);
    playSelect();
  }
  
  const toggleControlsMode = () => {
    const oldMode = controlsSettings[MODE_ID];
    let newMode = oldMode === MODE_CAR ? MODE_FOOT : MODE_CAR;
    const newControlsSettings = { ...controlsSettings, [MODE_ID]: newMode };
    miscFunctions.setControlsSettings(newControlsSettings);
    playSelect();
  }

  const cycleConfigOptions = (direction) => {
    // Only left or right allowed here!
    let sign;
    if (direction === DIRECTION_LEFT) sign = -1; else if (direction === DIRECTION_RIGHT) sign = 1; else return;

    const currentOption = controlsSettings[CONFIG_ID];
    let newOption = currentOption + sign;

    if (newOption < CONFIG_1) newOption = CONFIG_4;
    if (newOption > CONFIG_4) newOption = CONFIG_1;
    
    const newControlsSettings = {...controlsSettings,[CONFIG_ID]: newOption};
    miscFunctions.setControlsSettings(newControlsSettings);

    playSelect();
  }

  return { toggleConfigChangingMode, toggleGenericOption, cycleConfigOptions, toggleControlsMode };
};

export default useControlsGenerics;