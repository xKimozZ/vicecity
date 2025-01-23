import { useSelector } from "react-redux";
import useSoundManager from "./useSoundManager";
import { navigationSelector } from "../store/navigationSlice";
import { buttonGroups } from "../constants/buttonGroups";
import menuOptions from "../constants/menuOptions";
import { languageSelector } from "../store/localizationSlice";
import handleMenuEvents from "../utils/events/menuSpecificEventHandling";
import useDispatchAbstractor from "./useDispatchAbstractor";
import { useEffect } from "react";

const useEventHandler = () => {
  const { navigationFunctions, miscFunctions, localizationFunctions, cursorFunctions } = useDispatchAbstractor();
  const currentLanguage = useSelector(languageSelector);
  const { playHover, playSelect, playBack, playError, playInfo } = useSoundManager();
  const { activeButtonGroup, currentActions, hoveredOption, keyPressed, bigHover} =useSelector(navigationSelector);

  const backToNavigation = () => {
    navigationFunctions.setBigHover({
      active: false,
    });
    navigationFunctions.setHoveredOption(activeButtonGroup);
    navigationFunctions.setButtonGroup(buttonGroups.MAIN);
  };

  // global actions and functions unlikely to change
  const reducerFunctions = { navigationFunctions, miscFunctions, localizationFunctions, cursorFunctions };

  const staticActions = {
    sounds: {
      playHover: playHover,
      playSelect: playSelect,
      playBack: playBack,
      playInfo: playInfo,
      playError: playError,
    },
    navigation: {
      backToNavigation: backToNavigation,
    },
  };

  const dynamicVariables = {
    activeButtonGroup: activeButtonGroup,
    hoveredOption: hoveredOption,
    keyPressed: keyPressed,
    currentLanguage: currentLanguage,

    nextMenu: currentActions.nextMenu,
    nextLanguage: currentActions.nextLanguage,
    trigger: currentActions.trigger,
    fileExists: currentActions.fileExists,
    bigHover: bigHover,
  };

  const { handleStats, handleMain, handleLoad, handleSelectGeneral,updateParams, handleDisplay } = handleMenuEvents(staticActions, reducerFunctions);
  useEffect(() => {
    updateParams(dynamicVariables);
  }, [activeButtonGroup,hoveredOption,keyPressed,currentLanguage,currentActions,bigHover]);

  const handleHover = (buttonNumber) => {
    // special case to prevent hovering over 'load game' and 'new game' when you are navigating across savegames
    if (
      activeButtonGroup === buttonGroups.LOAD &&
      hoveredOption > 2 &&
      buttonNumber <= 2
      || bigHover.active && buttonNumber != hoveredOption
    )
      return;

    if (buttonNumber) navigationFunctions.setHoveredOption(buttonNumber);

    // Note: this switch statement is mostly dedicated for "special" cases which absolutely need the latest input
    // If an actionList was sent, this is because there was no other way to convey the absolute latest state
    switch (activeButtonGroup) {
      case buttonGroups.MAIN:
        const hoverMenu = {newMenu: menuOptions[buttonNumber - 1].actions.nextMenu};
        handleMain("hover", hoverMenu);
        break;
      case buttonGroups.STATS:
        const actionList = { direction: buttonNumber === 1 ? "up" : "down" };
        handleStats("hover", actionList);
        break;
      default:
        break;
    }

    // In exempted cases of debouncing (stats scroll for example)
    // This will prevent the sound from playing over and over again
    // If down key is held
    if (!keyPressed || activeButtonGroup !== buttonGroups.STATS) playHover();
  };

  const handleSelect = (triggeredBy) => {
    // Because if a click happens on any button that belongs to the current group but not hovered on
    // It will trigger the hovered button's event anyway
    // This will shift the hover onto the unhovered yet just selected button
    if (triggeredBy) {
      if (triggeredBy !== hoveredOption) {
        // If click on 'load game' or 'new game' while navigating across savegames
        if (activeButtonGroup === buttonGroups.LOAD && hoveredOption > 2) {
          handleBack();
          handleHover(triggeredBy);
        }
        if (bigHover.active) {
          navigationFunctions.setHoveredOption(triggeredBy);
          playHover();
          navigationFunctions.setBigHover({...bigHover, active: false});
        }
        if (activeButtonGroup === buttonGroups.MAIN) {
          handleHover(triggeredBy);
        }
        return;
      }
    }

    switch (activeButtonGroup) {
      default:
        // No unique inputs expected here, so the switch statement is handled in the function
        handleSelectGeneral();
        break;
    }
  };

  const handleBack = (overRide = 0) => {
    if (activeButtonGroup !== buttonGroups.MAIN) {
      switch (activeButtonGroup) {
        case buttonGroups.LOAD:
          const actionList = {shouldExitMenu: overRide === 1 || hoveredOption < 3 ? true : false,};
          handleLoad("back", actionList);
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

  const handleInfo = () => {
    playInfo();
  };

  return {handleBack,handleSelect,handleError,handleHover,handleInfo,backToNavigation};
};

export default useEventHandler;