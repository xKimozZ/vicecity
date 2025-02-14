import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import { actionNames } from "../../../constants/actionNames";
import useControlsGenerics from "./useControlsGenerics";

const { HOVER, SELECT, BACK } = actionNames.GENERAL;

const { CONFIG_ID, MODE_ID, VIB_ID, FP_ID } = actionNames.CONTROLS;

const useControlsEvents = (globalHookFunctions) => {

  const { toggleGenericOption, toggleConfigChangingMode, cycleConfigOptions } = useControlsGenerics(globalHookFunctions);

  const { selectorAbstractor } = useReduxAbstractorContext();
  const { bigHover, currentActions } = selectorAbstractor.navigationState;
  const { trigger: optionId } = currentActions;

  const selectCase = () => {
    switch (optionId) {
      case CONFIG_ID:
        toggleConfigChangingMode();
        break;
      case MODE_ID:
      case VIB_ID:
      case FP_ID:
        toggleGenericOption();
        break;
    }
  };

  const hoverCase = (direction) => {
    switch (optionId) {
      case CONFIG_ID:
        if (bigHover.active) cycleConfigOptions(direction);
        break;
      default:
        break;
    }
  };

  const handleControls = (eventType, param) => {
    switch (eventType) {
      case SELECT:
        selectCase();
        break;
      case HOVER:
        hoverCase(param);
        break;
      case BACK:
      default:
        break;
    }
  };

  return { handleControls };
};

export default useControlsEvents;
