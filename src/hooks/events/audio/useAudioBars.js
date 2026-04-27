import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import useSoundManager from "../../useSoundManager";
import useDebounce from "../useDebounce";
import { actionNames } from "../../../constants/actionNames";

const { DIRECTION_RIGHT, DIRECTION_LEFT, DIRECTION_UP, DIRECTION_DOWN } = actionNames.ARROWS;

const { SFX_ID, MUSIC_ID } = actionNames.AUDIO;

const useAudioBars = (globalHookFunctions) => {
  const { toggleBigHover, incrementBar } = globalHookFunctions;
  const { playSoundAfterDelay } = useDebounce();
  const { playHover, playSelect } = useSoundManager();

  const { dispatchAbstractor, selectorAbstractor } = useReduxAbstractorContext();
  const { miscFunctions } = dispatchAbstractor;
  const { audioSettings } = selectorAbstractor.miscState;
  const { currentActions } = selectorAbstractor.navigationState;
  const { trigger: optionId } = currentActions;

  const toggleBarMode = () => {
    toggleBigHover();
    playHover();
  };

  const changeVolume = (direction) => {
    const currentVolume = audioSettings[optionId];
    if (direction === DIRECTION_UP || direction === DIRECTION_DOWN) return;
    let sign = direction === DIRECTION_LEFT ? -1 : 1;

    const newVolume = incrementBar(currentVolume, sign, playSoundAfterDelay);

    const newAudioSettings = {
      ...audioSettings,
      [optionId]: newVolume,
    };
    miscFunctions.setAudioSettings(newAudioSettings);
  };

  const directClickOnBar = (barSelected) => {
      const newVolume = barSelected / 16;

      const newAudioSettings = {...audioSettings, [optionId]: newVolume };
      miscFunctions.setAudioSettings(newAudioSettings);
      playSelect();
  };

  return { toggleBarMode, changeVolume, directClickOnBar };
};

export default useAudioBars;