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
import { languageSelector, setLanguage } from "../store/localizationSlice";

const useEventHandler = () => {
  const menuOptions = useMenuOptions();
  const currentLanguage = useSelector(languageSelector);
  const { playHover, playSelect, playBack, playError, playInfo } =
    useSoundManager();
  const dispatch = useDispatch();
  const { activeButtonGroup, currentActions, hoveredOption } = useSelector(navigationSelector);

  const handleInfo = () => {
    playInfo();
  };

  const handleHover = (buttonNumber) => {
    if (buttonNumber)
    dispatch(setHoveredOption(buttonNumber));
    if ( activeButtonGroup === buttonGroups.MAIN ) {
      const buttonActions = menuOptions[buttonNumber-1].actions;
      dispatch(setNextGroup(buttonActions.triggerMenu));
      dispatch(setCurrentActions(buttonActions));
    };

    if ( activeButtonGroup === buttonGroups.STATS )
    {
      // stats scroll logic todo here
    }
    playHover();
  };

  const handleSelect = () => {
    selectCase();
  };

  const selectCase = (actions) => {
    if (activeButtonGroup === buttonGroups.MAIN) {
      if (currentActions.triggerMenu === buttonGroups.BRIEF) return;

      dispatch(setButtonGroup(currentActions.triggerMenu));
      dispatch(setHoveredOption(1));
      playSelect();
    } else if (activeButtonGroup === buttonGroups.LANGUAGE) {
      playHover();
      switch (hoveredOption) {
        case 1:
          if (currentLanguage === "en") break;
          dispatch(setLanguage("en"));
          break;
        case 2:
          if (currentLanguage === "fr") break;
          dispatch(setLanguage("fr"));
          break;
        case 3:
          if (currentLanguage === "de") break;
          dispatch(setLanguage("de"));
          break;
        case 4:
          if (currentLanguage === "it") break;
          dispatch(setLanguage("it"));
          break;
        case 5:
          if (currentLanguage === "es") break;
          dispatch(setLanguage("es"));
          break;
        default:
          break;
      }
    } else if (activeButtonGroup === buttonGroups.STATS) {
      handleBack();
    }
  };

  const handleBack = () => {
    backCase();
  };

  const backCase = () => {
    if (activeButtonGroup !== buttonGroups.MAIN) {
      const activeButtonGroupIndex = buttonGroupMap[activeButtonGroup] ?? 0;
      dispatch(setHoveredOption(activeButtonGroupIndex));
      dispatch(setButtonGroup(buttonGroups.MAIN));
      if (activeButtonGroup === buttonGroups.STATS)
        playHover();
      else
        playBack();
    }
    else
    playBack();
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
