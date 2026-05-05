import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import { actionNames } from "../../../constants/actionNames";
import useAudioBars from "./useAudioBars";
import useAudioRadio from "./useAudioRadio";

const { HOVER, SELECT, BACK, SPECIAL } = actionNames.GENERAL;

const { RADIO_ID, MUSIC_ID, SFX_ID, OUTPUT_ID } = actionNames.AUDIO;

const useAudioEvents = (globalHookFunctions, pauseRadio) => {
  const { selectorAbstractor } = useReduxAbstractorContext();
  const { bigHover, currentActions } = selectorAbstractor.navigationState;
  const { toggleBarMode, changeVolume, directClickOnBar } = useAudioBars(globalHookFunctions);
  const { changeStation } = useAudioRadio(globalHookFunctions);
  const { playHover, playSelect } = globalHookFunctions;
  const { trigger: optionId } = currentActions;

  const selectCase = () => {
    switch (optionId) {
      case MUSIC_ID:
      case SFX_ID:
      case RADIO_ID:
        toggleBarMode();
        break;
      case OUTPUT_ID:
        playSelect();
        //generic screen
        break;
    }
  };

  const hoverCase = (direction) => {
    switch (optionId) {
      case MUSIC_ID:
      case SFX_ID:
        changeVolume(direction);
        break;
      case RADIO_ID:
        changeStation(direction);
        break;
    }
  };

  const specialCase = (barSelected) => {
    if (bigHover.active && (currentActions.trigger === SFX_ID || currentActions.trigger === MUSIC_ID))
      directClickOnBar(barSelected);
  };

  const handleAudio = (eventType, param) => {
    switch (eventType) {
      case SELECT:
        selectCase();
        break;
      case HOVER:
        hoverCase(param);
        break;
      case SPECIAL:
        // If clicked directly on the brightness bar
        specialCase(param);
        break;
      case BACK:
        // Pause radio here so normal exit stops playback.
        // If the user somehow leaves via the output-option exploit, this BACK never fires,
        // intentionally replicating the original game bug where audio bleeds into the frontend.
        pauseRadio();
        break;
      default:
        break;
    }
  };

  return { handleAudio };
};

export default useAudioEvents;
