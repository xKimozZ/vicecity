import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import useSoundManager from "../../useSoundManager";
import useDebounce from "../useDebounce";
import { actionNames } from "../../../constants/actionNames";
import { useState } from "react";

const { DIRECTION_RIGHT, DIRECTION_LEFT, DIRECTION_UP, DIRECTION_DOWN } = actionNames.ARROWS;

const { RADIO_ID, RADIO_LIST_START, RADIO_LIST_END } = actionNames.AUDIO;

const useAudioRadio = (globalHookFunctions) => {
  const { playSoundAfterDelay } = useDebounce();
  const { playSelect } = useSoundManager();
  const [lastKeyPressedTime, setLastKeyPressedTime] = useState(0);

  const { dispatchAbstractor, selectorAbstractor } = useReduxAbstractorContext();
  const { miscFunctions } = dispatchAbstractor;
  const { audioSettings } = selectorAbstractor.miscState;

  const changeStation = (direction) => {
    const delta = Date.now() - lastKeyPressedTime;
    if (delta < 450) return;
    let newStation;
    if (direction === DIRECTION_RIGHT) {
      newStation = audioSettings[RADIO_ID] + 1 > RADIO_LIST_END ? RADIO_LIST_START : audioSettings[RADIO_ID] + 1;
    } else if (direction === DIRECTION_LEFT) {
      newStation = audioSettings[RADIO_ID] - 1 < RADIO_LIST_START ? RADIO_LIST_END : audioSettings[RADIO_ID] - 1;
    }
    const newAudioSettings = {
      ...audioSettings,
      [RADIO_ID]: newStation,
    };
    miscFunctions.setAudioSettings(newAudioSettings);
    playSelect();
    setLastKeyPressedTime(Date.now());
  };

  return { changeStation };
};

export default useAudioRadio;