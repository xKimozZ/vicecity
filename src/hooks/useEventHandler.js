import { useDispatch, useSelector } from "react-redux";
import useSoundManager from "./useSoundManager";
import {
  setHoveredOption,
  setButtonGroup,
  setNextGroup,
  navigationSelector,
  setCurrentActions,
} from "../store/navigationSlice";
import { buttonGroups } from "../constants/buttonGroups";
import useMenuOptions from "./useMenuOptions";
import { languageSelector, setLanguage } from "../store/localizationSlice";
import { languageMap } from "../constants/menuStrings";
import {
  decrementStatsTranslate,
  incrementStatsTranslate,
  toggleStatsDirection,
} from "../store/miscSlice";
import handleMenuEvents from "../utils/event_handling/menuSpecificEventHandling";

const useEventHandler = () => {
  const menuOptions = useMenuOptions();
  const currentLanguage = useSelector(languageSelector);

  const { playHover, playSelect, playBack, playError, playInfo } =
    useSoundManager();
  const dispatch = useDispatch();
  const { activeButtonGroup, currentActions, hoveredOption, keyPressed } =
    useSelector(navigationSelector);

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
    dispatch(setHoveredOption(activeButtonGroup));
    dispatch(setButtonGroup(buttonGroups.MAIN));
  };

  // global actions and functions unlikely to change
  const staticActions = {
    sounds: {
      playHover: playHover,
      playSelect: playSelect,
      playBack: playBack,
      playInfo: playInfo,
      playError: playError,
    },
    navigation: {
      exitMenu: backToNavigation,
      triggerMenu: triggerMenu,
      setHover: (buttonNumber) => dispatch(setHoveredOption(buttonNumber)),
    },
    misc: {
      scrollDown: () => {
        dispatch(incrementStatsTranslate());
        dispatch(toggleStatsDirection("up"));
      },
      scrollUp: () => {
        dispatch(decrementStatsTranslate());
        dispatch(toggleStatsDirection("down"));
      },
      changeLanguage: changeLanguage,
      toggleLoad: () => {
        hoveredOption < 3
          ? dispatch(setHoveredOption(3))
          : dispatch(setHoveredOption(1));
      },
    },
  };

  const dynamicVariables = {
    nextMenu: currentActions.nextMenu,
    nextLanguage: currentActions.nextLanguage,
    trigger: currentActions.trigger,
    fileExists: currentActions.fileExists,
  };

  const { handleStats, handleMain, handleLanguage, handleLoad } =
    handleMenuEvents(staticActions);

  const handleInfo = () => {
    playInfo();
  };

  const handleHover = (buttonNumber) => {
    // special case to prevent hovering over 'load game' and 'new game' when you are navigating across savegames
    if (
      activeButtonGroup === buttonGroups.LOAD &&
      hoveredOption > 2 &&
      buttonNumber <= 2
    )
      return;

    if (buttonNumber) dispatch(setHoveredOption(buttonNumber));
    switch (activeButtonGroup) {
      case buttonGroups.MAIN:
        {
          const hoverMenu = {
            newMenu: menuOptions[buttonNumber - 1].actions.nextMenu,
            setNextMenu: (nextMenu) => dispatch(setNextGroup(nextMenu)),
          };
          handleMain("hover", hoverMenu);
        }
        break;
      case buttonGroups.STATS:
        {
          const actionList = {
            direction: buttonNumber === 1 ? "up" : "down",
          };
          handleStats("hover", actionList);
        }
        break;
      default:
        break;
    }

    // In exempted cases of debouncing (stats scroll for example)
    // This will prevent the sound from playing over and over again
    // If down key is held
    if (!keyPressed) playHover();
  };

  const handleSelect = (triggeredBy) => {
    // Because if a click happens on any button that belongs to the current group but not hovered on
    // It will trigger the hovered button's event anyway
    // This will shift the hover onto the unhovered yet just selected button
    if (triggeredBy) {
      if (triggeredBy !== hoveredOption) {
        if (activeButtonGroup === buttonGroups.LOAD && hoveredOption > 2) {
          handleBack();
        }
        handleHover(triggeredBy);
        return;
      }
    }

    switch (activeButtonGroup) {
      case buttonGroups.MAIN:
        {
          const { nextMenu } = dynamicVariables;
          handleMain("select", { nextMenu });
        }
        break;
      case buttonGroups.LANGUAGE:
        {
          const { nextLanguage } = dynamicVariables;
          handleLanguage("select", { nextLanguage });
        }
        break;
      case buttonGroups.LOAD:
        {
          const actionList = {
            nextAction: dynamicVariables.trigger,
            fileExists: dynamicVariables.fileExists,
          };
          handleLoad("select", actionList);
        }
        break;
      case buttonGroups.STATS:
        handleStats("select");
        break;
      default:
        break;
    }
  };

  const handleBack = (overRide = 0) => {
    if (activeButtonGroup !== buttonGroups.MAIN) {
      switch (activeButtonGroup) {
        case buttonGroups.STATS:
          handleStats("back");
          break;
        case buttonGroups.LOAD:
          {
            const actionList = {
              shouldExitMenu:
                overRide === 1 || hoveredOption < 3 ? true : false,
            };
            handleLoad("back", actionList);
          }
          break;
        default:
          backToNavigation();
          playBack();
          break;
      }
    } else playBack();
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
    backToNavigation,
  };
};

export default useEventHandler;
