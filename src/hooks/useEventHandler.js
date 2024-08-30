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
import { languageMap } from "../constants/menuStrings";

const useEventHandler = () => {
  const menuOptions = useMenuOptions();
  const currentLanguage = useSelector(languageSelector);

  const { playHover, playSelect, playBack, playError, playInfo } =
    useSoundManager();
  const dispatch = useDispatch();
  const { activeButtonGroup, currentActions, hoveredOption } =
    useSelector(navigationSelector);

  const handleInfo = () => {
    playInfo();
  };

  const handleHover = (buttonNumber) => {
    if (activeButtonGroup === buttonGroups.LOAD && hoveredOption > 2 && buttonNumber <= 2)
      return;
    if (buttonNumber) dispatch(setHoveredOption(buttonNumber));
    if (activeButtonGroup === buttonGroups.MAIN) {
      // Load in the menu for that option
      const buttonActions = menuOptions[buttonNumber - 1].actions;
      dispatch(setNextGroup(buttonActions.nextMenu));
    }

    if (activeButtonGroup === buttonGroups.STATS) {
      // stats scroll logic todo here
    }
    playHover();
  };

  const handleSelect = (triggeredBy) => {
    if (triggeredBy)
    {
      if (triggeredBy !== hoveredOption) {
        if (activeButtonGroup === buttonGroups.LOAD)
        {
          handleBack();
        }
        handleHover(triggeredBy);
        return;
      }
    }
    
    if (activeButtonGroup === buttonGroups.MAIN) {
      // If allowed to enter the menu (all except brief), return true and play the sound
      if (triggerMenu(currentActions.nextMenu)) playSelect();
    } else if (activeButtonGroup === buttonGroups.LANGUAGE) {
      playHover();
      changeLanguage(currentActions.nextLanguage);
    } else if (activeButtonGroup === buttonGroups.STATS) {
      handleBack();
    } else if (activeButtonGroup === buttonGroups.LOAD ) {
      if (currentActions.trigger === "loadGame") {
        dispatch(setHoveredOption(3));
        playHover();
      }
      if (
        currentActions.fileExists !== undefined &&
        currentActions.fileExists === false
      ) {
        playError();
      }
    }
  };

  const handleBack = (overRide = 0) => {
    if (activeButtonGroup !== buttonGroups.MAIN) {
      if (activeButtonGroup === buttonGroups.STATS) {
        backToNavigation();
        playHover();
      }
      else if (activeButtonGroup === buttonGroups.LOAD)
      {
        if (overRide === 1) {
          playBack();
          backToNavigation();
          return;
        }
        if (hoveredOption > 2)
        {
          dispatch(setHoveredOption(1));
          playHover();
        }
        else {
          backToNavigation();
          playBack();
        }
      }
      else {
        backToNavigation();
        playBack();
      }
    }
    else playBack();
  };

  const handleError = () => {
    playError();
  };

  const triggerMenu = (newMenu) => {
    if (newMenu === buttonGroups.BRIEF) return false;
    dispatch(setButtonGroup(newMenu));
    dispatch(setHoveredOption(1));
    return true;
  };

  const changeLanguage = (newLanguage) => {
    if (languageMap[newLanguage] && currentLanguage !== newLanguage) {
      dispatch(setLanguage(newLanguage));
    }
  };

  const backToNavigation = () => {
    const activeButtonGroupIndex = buttonGroupMap[activeButtonGroup] ?? 0;
    dispatch(setHoveredOption(activeButtonGroupIndex));
    dispatch(setButtonGroup(buttonGroups.MAIN));
  }

  return {
    handleBack,
    handleSelect,
    handleError,
    handleHover,
    handleInfo,
    backToNavigation,
  };
};

export default useEventHandler;
