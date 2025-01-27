import { useReduxAbstractorContext } from "../context/ReduxAbstractorContext";
import { useEffect } from "react";
import useSoundManager from "./useSoundManager";
import useGlobalEvents from "./events/useGlobalEvents";
import useStatsEvents from "./events/useStatsEvents";
import useMainEvents from "./events/useMainEvents";
import useLanguageEvents from "./events/useLanguageEvents";
import useLoadEvents from "./events/useLoadEvents";
import useDisplayEvents from "./events/useDisplayEvents";
import { actionNames } from "../constants/actionNames";
import { buttonGroups } from "../constants/buttonGroups";

const { SELECT , HOVER, BACK, SPECIAL } = actionNames.GENERAL;

const useEventHandler = () => {
  const { dispatchAbstractor, selectorAbstractor } = useReduxAbstractorContext();
  const { navigationFunctions } = dispatchAbstractor;
  const { activeButtonGroup, hoveredOption, keyPressed, bigHover} =selectorAbstractor.navigationState;
  
  const { playHover, playBack, playError, playInfo } = useSoundManager();
  const globalHookFunctions = useGlobalEvents();

  const { handleMain } = useMainEvents(globalHookFunctions);
  const { handleStats } = useStatsEvents(globalHookFunctions);
  const { handleLanguage } = useLanguageEvents(globalHookFunctions);
  const { handleLoad } = useLoadEvents(globalHookFunctions);
  const { handleDisplay } = useDisplayEvents(globalHookFunctions);

  // Initialize stuff
  useEffect(() => {
    globalHookFunctions.updateBrightness();
  }, []);

  const handleHover = (buttonNumber) => {
    // special case to prevent hovering over 'load game' and 'new game' when you are navigating across savegames
    if (
      activeButtonGroup === buttonGroups.LOAD &&
      hoveredOption > 2 &&
      buttonNumber <= 2
      || bigHover.active && buttonNumber != hoveredOption && buttonNumber > 0
    )
      return;

    if (buttonNumber && buttonNumber > 0) navigationFunctions.setHoveredOption(buttonNumber);

    // Note: this switch statement is mostly dedicated for "special" cases which absolutely need the latest input
    // If an actionList was sent, this is because there was no other way to convey the absolute latest state
    switch (activeButtonGroup) {
      case buttonGroups.MAIN:
        handleMain(HOVER, buttonNumber);
        break;
      case buttonGroups.STATS:
        handleStats(HOVER, buttonNumber);
        break;
      case buttonGroups.DISPLAY:
        if (buttonNumber > 0) break; // Only directions here!
        handleDisplay(HOVER, buttonNumber);
        return; // Need to play my own sound here inside
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
      case buttonGroups.MAIN:
        handleMain(SELECT);
        break;
      case buttonGroups.STATS:
        handleStats(SELECT);
        break;
      case buttonGroups.LANGUAGE:
        handleLanguage(SELECT);
        break;
      case buttonGroups.LOAD:
        handleLoad(SELECT);
        break;
      case buttonGroups.DISPLAY:
        handleDisplay(SELECT);
        break;
      default:
        break;
    }
  };

  const handleSpecial = (triggeredBy) => {
    switch (activeButtonGroup) {
      case buttonGroups.DISPLAY:
        const actionList = { barSelected: triggeredBy };
        handleDisplay(SPECIAL, actionList);
        break;
      default:
        console.log("INVALID SPECIAL EVENT!");
        break;
    }
  };

  const handleBack = (overRide = 0) => {
    if (activeButtonGroup !== buttonGroups.MAIN) {
      switch (activeButtonGroup) {
        case buttonGroups.LOAD:
          handleLoad(BACK, overRide);
          break;
        default:
          globalHookFunctions.backToNavigation();
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

  return { handleBack,handleSelect,handleError,handleHover,handleSpecial,handleInfo, globalHookFunctions };
};

export default useEventHandler;