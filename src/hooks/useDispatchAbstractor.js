import { useDispatch, useSelector } from "react-redux";
import {
  nav_setHoveredOption,
  nav_setButtonGroup,
  nav_setNextGroup,
  nav_setCurrentActions,
  nav_setKeyPressed,
  nav_setLastKeyPressedTime,
  nav_setBigHover,
} from "../store/navigationSlice";
import { local_setLanguage } from "../store/localizationSlice";
import { misc_decrementStatsTranslate, misc_incrementStatsTranslate, misc_setBriefKey, misc_setStatsLimit, misc_toggleStatsDirection,} from "../store/miscSlice";
import { cursor_changeLocation } from "../store/cursorSlice";

const useDispatchAbstractor = () => {
  const dispatch = useDispatch();

    // navigationSlice
    const setKeyPressed = (state) => dispatch(nav_setKeyPressed(state));
    const setLastKeyPressedTime = (state) => dispatch(nav_setLastKeyPressedTime(state));
    const setButtonGroup = (groupId) => dispatch(nav_setButtonGroup(groupId));
    const setHoveredOption = (buttonId) => dispatch(nav_setHoveredOption(buttonId));
    const setNextGroup = (menuId) => dispatch(nav_setNextGroup(menuId));
    const setCurrentActions = (actionId) => dispatch(nav_setCurrentActions(actionId));
    const setBigHover = (hoverStruct) => dispatch(nav_setBigHover(hoverStruct));

    const navigationFunctions = {setKeyPressed, setLastKeyPressedTime, setButtonGroup, 
      setHoveredOption, setNextGroup, setCurrentActions, setBigHover, };

    // localizationSlice
    const setLanguage = (languageId) => dispatch(local_setLanguage(languageId));

    const localizationFunctions = {setLanguage};

    // miscSlice
    const decrementStatsTranslate = () => dispatch(misc_decrementStatsTranslate());
    const incrementStatsTranslate = () => dispatch(misc_incrementStatsTranslate());
    const setBriefKey = (briefKey) => dispatch(misc_setBriefKey(briefKey));
    const setStatsLimit = (limit) => dispatch(misc_setStatsLimit(limit));
    const toggleStatsDirection = (direction) => dispatch(misc_toggleStatsDirection(direction));

    const miscFunctions = {decrementStatsTranslate, incrementStatsTranslate, setBriefKey, setStatsLimit, toggleStatsDirection};

    // cursorSlice
    const changeLocation = (rectParams) => dispatch(cursor_changeLocation(rectParams));

    const cursorFunctions = {changeLocation};



  return {
    navigationFunctions, miscFunctions, localizationFunctions, cursorFunctions,
  };
};

export default useDispatchAbstractor;
