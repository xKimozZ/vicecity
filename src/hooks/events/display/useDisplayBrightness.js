import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import useSoundManager from "../../useSoundManager";
import useDebounce from "../useDebounce";
import { actionNames } from "../../../constants/actionNames";

const { DIRECTION_RIGHT, DIRECTION_LEFT, DIRECTION_UP, DIRECTION_DOWN } = actionNames.ARROWS;

const { BRIGHTNESS_ID } = actionNames.DISPLAY;

const DEFAULT_FACTORS = {
  clipFactor: 3,
  topFactor: 0.95,
  leftFactor: 1,
  widthFactor: 1.11,
  heightFactor: 1.3,
};

const useDisplayBrightness = (globalHookFunctions) => {
  const { toggleBigHover, incrementBar, updateBrightness } = globalHookFunctions;
  const { playSoundAfterDelay } = useDebounce();
  const { playHover, playSelect } = useSoundManager();

  const { dispatchAbstractor, selectorAbstractor } = useReduxAbstractorContext();
  const { miscFunctions } = dispatchAbstractor;
  const { displaySettings } = selectorAbstractor.miscState;

  const toggleBrightnessMode = () => {
    toggleBigHover(DEFAULT_FACTORS);
    playHover();
  };

  const changeBrightness = (direction) => {
    const currentBrightness = displaySettings[BRIGHTNESS_ID];
    if (direction === DIRECTION_UP || direction === DIRECTION_DOWN) return;
    let sign = direction === DIRECTION_LEFT ? -1 : 1;

    const newBrightness = incrementBar(currentBrightness, sign, playSoundAfterDelay);
    updateBrightness(newBrightness);

    const newDisplaySettings = {
      ...displaySettings,
      [BRIGHTNESS_ID]: newBrightness,
    };
    miscFunctions.setDisplaySettings(newDisplaySettings);
  };

  const directClickOnBar = (barSelected) => {
      const newBrightness = barSelected / 16;
      updateBrightness(newBrightness);

      const newDisplaySettings = {...displaySettings, [BRIGHTNESS_ID]: newBrightness };
      miscFunctions.setDisplaySettings(newDisplaySettings);
      playSelect();
  };

  return { toggleBrightnessMode, changeBrightness, directClickOnBar };
};

export default useDisplayBrightness;
