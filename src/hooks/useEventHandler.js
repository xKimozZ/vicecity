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
    if (buttonNumber) dispatch(setHoveredOption(buttonNumber));
    if (activeButtonGroup === buttonGroups.MAIN) {
      const buttonActions = menuOptions[buttonNumber - 1].actions;
      dispatch(setNextGroup(buttonActions.nextMenu));
    }

    if (activeButtonGroup === buttonGroups.STATS) {
      // stats scroll logic todo here
    }
    playHover();
  };

  const handleSelect = () => {
    selectCase();
  };

  const selectCase = (actions) => {
    if (activeButtonGroup === buttonGroups.MAIN) {
      if ( triggerMenu(currentActions.nextMenu) ) playSelect();
    } else if (activeButtonGroup === buttonGroups.LANGUAGE) {
      playHover();
      changeLanguage(currentActions.nextLanguage);
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
      if (activeButtonGroup === buttonGroups.STATS) playHover();
      else playBack();
    } else playBack();
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

  return {
    handleBack,
    handleSelect,
    handleError,
    handleHover,
    handleInfo,
  };
};

export default useEventHandler;
