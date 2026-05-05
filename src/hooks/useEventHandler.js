import { useReduxAbstractorContext } from "../context/ReduxAbstractorContext";
import { useEffect } from "react";
import useGlobalEvents from "./events/useGlobalEvents";
import useStatsEvents from "./events/useStatsEvents";
import useMainEvents from "./events/useMainEvents";
import useLanguageEvents from "./events/useLanguageEvents";
import useLoadEvents from "./events/useLoadEvents";
import useDisplayEvents from "./events/display/useDisplayEvents";
import useMapEvents from "./events/map/useMapEvents";
import { actionNames } from "../constants/actionNames";
import { buttonGroups, buttonIndices } from "../constants/buttonGroups";
import useControlsEvents from "./events/controls/useControlsEvents";
import useAudioEvents from "./events/audio/useAudioEvents";
import useRadioPlayer from "./useRadioPlayer";

const { SELECT , HOVER, BACK, SPECIAL } = actionNames.GENERAL;

const useEventHandler = () => {
  const { dispatchAbstractor, selectorAbstractor } = useReduxAbstractorContext();
  const { navigationFunctions } = dispatchAbstractor;
  const { activeButtonGroup, hoveredOption, keyPressed, bigHover} =selectorAbstractor.navigationState;
  
  const globalHookFunctions = useGlobalEvents();
  const { playHover, playBack, playError, playInfo } = globalHookFunctions;

  const { handleMain } = useMainEvents(globalHookFunctions);
  const { handleStats } = useStatsEvents(globalHookFunctions);
  const { handleLanguage } = useLanguageEvents(globalHookFunctions);
  const { handleLoad } = useLoadEvents(globalHookFunctions);
  const { handleDisplay } = useDisplayEvents(globalHookFunctions);
  const { handleControls } = useControlsEvents(globalHookFunctions);
  const { handleMap } = useMapEvents(globalHookFunctions);
  const { handleAudio } = useAudioEvents(globalHookFunctions);
  useRadioPlayer();


  // Initialize stuff
  useEffect(() => {
    globalHookFunctions.updateBrightness();
  }, []);

  const handleHover = (buttonNumber) => {

    // Negative numbers are dedicated for special inputs like arrows in certain options
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
      case buttonGroups.CONTROLS:
        if (buttonNumber > 0) break;
        handleControls(HOVER, buttonNumber);
        return;
      case buttonGroups.MAP:
        if (buttonNumber > 0) break;
        handleMap(HOVER, buttonNumber);
        return;
      case buttonGroups.AUDIO:
        if (buttonNumber > 0) break;
        handleAudio(HOVER, buttonNumber);
        return;
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
      if (triggeredBy && triggeredBy !== hoveredOption) {
        
        if (bigHover.active) {
          navigationFunctions.setHoveredOption(triggeredBy);
          navigationFunctions.setBigHover({...bigHover, active: false});
        }
        handleHover(triggeredBy);
        return;
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
      case buttonGroups.CONTROLS:
        handleControls(SELECT);
        break;
      case buttonGroups.MAP:
        handleMap(SELECT, hoveredOption);
        break;
      case buttonGroups.AUDIO:
        handleAudio(SELECT, hoveredOption);
        break;
      default:
        break;
    }
  };

  const handleSpecial = (triggeredBy) => {
    switch (activeButtonGroup) {
      case buttonGroups.DISPLAY:
        handleDisplay(SPECIAL, triggeredBy);
        break;
      case buttonGroups.MAP:
        handleMap(SPECIAL, triggeredBy);
        break;
      case buttonGroups.AUDIO:
        handleAudio(SPECIAL, triggeredBy);
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