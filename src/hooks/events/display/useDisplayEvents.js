import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import useDisplayScPos from "./useDisplayScPos";
import { actionNames } from "../../../constants/actionNames";
import useDisplayBrightness from "./useDisplayBrightness";
import useDisplayGenerics from "./useDisplayGenerics";

const { HOVER, SELECT, BACK, SPECIAL } = actionNames.GENERAL;

const {
  BRIGHTNESS_ID,
  TRAILS_ID,
  SUBTITLES_ID,
  WIDESCREEN_ID,
  RADAR_ID,
  HUD_ID,
  SCREENPOS_ID,
} = actionNames.DISPLAY;

const useDisplayEvents = (globalHookFunctions) => {

  const { toggleScreenPosMode, changeScreenPos } = useDisplayScPos(globalHookFunctions);
  const { toggleBrightnessMode, changeBrightness, directClickOnBar } = useDisplayBrightness(globalHookFunctions);
  const { toggleGenericOption, toggleRadarChangingMode, cycleRadarOptions } = useDisplayGenerics(globalHookFunctions);

  const { selectorAbstractor } = useReduxAbstractorContext();
  const { bigHover, currentActions } = selectorAbstractor.navigationState;
  const { trigger: optionId } = currentActions;

  const selectCase = () => {
    switch (optionId) {
      case SCREENPOS_ID:
        toggleScreenPosMode();
        break;
      case BRIGHTNESS_ID:
        toggleBrightnessMode();
        break;
      case TRAILS_ID:
      case SUBTITLES_ID:
      case WIDESCREEN_ID:
      case HUD_ID:
        toggleGenericOption();
        break;
      case RADAR_ID:
        toggleRadarChangingMode();
        break;
    }
  };

  const hoverCase = (direction) => {
    switch (optionId) {
      case BRIGHTNESS_ID:
        if (bigHover.active) changeBrightness(direction);
        break;
      case RADAR_ID:
        if (bigHover.active) cycleRadarOptions(direction);
        break;
      case SCREENPOS_ID:
        changeScreenPos(direction);
        break;
    }
  };

  const specialCase = (barSelected) => {
    if (bigHover.active && currentActions.trigger === BRIGHTNESS_ID)
      directClickOnBar(barSelected);
  };

  const handleDisplay = (eventType, param) => {
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
      default:
        break;
    }
  };

  return { handleDisplay };
};

export default useDisplayEvents;
