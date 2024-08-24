import { useDispatch, useSelector } from "react-redux";
import useSoundManager from "./useSoundManager";
import {
  setHoveredOption,
  setButtonGroup,
  setNextGroup,
  navigationSelector,
  setCurrentActions,
} from "../store/navigationSlice";
import { buttonGroupMap, buttonGroups } from "../constants/buttonGroups";

const useEventHandler = () => {
  const { playHover, playSelect, playBack, playError, playInfo } =
    useSoundManager();
  const dispatch = useDispatch();
  const { activeButtonGroup, currentActions } = useSelector(navigationSelector);

  const handleInfo = () => {
    playInfo();
  };

  const handleHover = (buttonNumber, actions) => {
    dispatch(setHoveredOption(buttonNumber));
    if (actions?.triggerMenu) {
      dispatch(setNextGroup(actions.triggerMenu));
      dispatch(setCurrentActions(actions));
    };
    playHover();
  };

  const handleSelect = () => {
    playSelect();
    selectCase();
  };

  const selectCase = (actions) => {
    if (activeButtonGroup === buttonGroups.MAIN) {
      dispatch(setButtonGroup(currentActions.triggerMenu));
      dispatch(setHoveredOption(1));
    } else if (activeButtonGroup === buttonGroups.LANGUAGE) {
      // Change language here
    }
  };

  const handleBack = () => {
    backCase();
    playBack();
  };

  const backCase = () => {
    if (activeButtonGroup !== buttonGroups.MAIN) {
      const activeButtonGroupIndex = buttonGroupMap[activeButtonGroup] ?? 0;
      dispatch(setHoveredOption(activeButtonGroupIndex));
      dispatch(setButtonGroup(buttonGroups.MAIN));
    }
  };

  const handleError = () => {
    playError();
  };

  return {
    handleBack,
    handleSelect,
    handleError,
    handleHover,
    handleInfo,
  };
};

export default useEventHandler;
