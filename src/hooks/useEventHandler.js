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
import useMenuOptions from "./useMenuOptions";
import { setLanguage } from "../store/localizationSlice";

const useEventHandler = () => {
  const menuOptions = useMenuOptions();
  const { playHover, playSelect, playBack, playError, playInfo } =
    useSoundManager();
  const dispatch = useDispatch();
  const { activeButtonGroup, currentActions, hoveredOption } = useSelector(navigationSelector);

  const handleInfo = () => {
    playInfo();
  };

  const handleHover = (buttonNumber) => {
    dispatch(setHoveredOption(buttonNumber));
    if ( activeButtonGroup === buttonGroups.MAIN ) {
      const buttonActions = menuOptions[buttonNumber-1].actions;
      dispatch(setNextGroup(buttonActions.triggerMenu));
      dispatch(setCurrentActions(buttonActions));
    };

    playHover();
  };

  const handleSelect = () => {
    selectCase();
  };

  const selectCase = (actions) => {
    if (activeButtonGroup === buttonGroups.MAIN) {
      dispatch(setButtonGroup(currentActions.triggerMenu));
      dispatch(setHoveredOption(1));
      playSelect();
    } else if (activeButtonGroup === buttonGroups.LANGUAGE) {
      playSelect();
      switch (hoveredOption) {
        case 1:
          dispatch(setLanguage('en'));
          break;
        case 2:
          dispatch(setLanguage('fr'));
          break;
        case 3:
          dispatch(setLanguage('de'));
          break;
        case 4:
          dispatch(setLanguage('it'));
          break;
        case 5:
          dispatch(setLanguage('es'));
          break;
        default:
          break;
      }
      // Change language here
    }
    else if (activeButtonGroup === buttonGroups.STATS) {
      handleBack();
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
