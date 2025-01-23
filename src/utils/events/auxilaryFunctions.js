import { buttonGroups } from "../../constants/buttonGroups";
import { languageMap } from "../../constants/menuStrings";

export const auxilaryFunctions = (reducerFunctions) => {
    const { navigationFunctions, miscFunctions, localizationFunctions, cursorFunctions } = reducerFunctions;

    const triggerMenu = (newMenu) => {
        if (newMenu === buttonGroups.BRIEF) return false;
        navigationFunctions.setButtonGroup(newMenu);
        navigationFunctions.setHoveredOption(1);
        return true;
      };
    
      const changeLanguage = (newLanguage, currentLanguage) => {
        if (languageMap[newLanguage] && currentLanguage !== newLanguage) {
          localizationFunctions.setLanguage(newLanguage);
        }
      };

      const scrollDown = () => {
        miscFunctions.incrementStatsTranslate();
        miscFunctions.toggleStatsDirection("up");
      };

      const scrollUp = () => {
        miscFunctions.decrementStatsTranslate();
        miscFunctions.toggleStatsDirection("down");
      };

      const toggleLoad = (hoveredOption) => {
        hoveredOption < 3
          ? navigationFunctions.setHoveredOption(3)
          : navigationFunctions.setHoveredOption(1);
      };

      const getElementById = (id) => {return document.getElementById(id);}

      const rectangleBuilder = (rect, cursorFactors) => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        return {
          top: (rect.top / viewportHeight) * 100,
          left: (rect.left / viewportWidth) * 100,
          width: (rect.width / viewportWidth) * 100,
          height: (rect.height / viewportHeight) * 100,
          ...cursorFactors,
        };
      }

      const setNextMenu = (nextMenu) => navigationFunctions.setNextGroup(nextMenu);

      const rerenderCursor = (targetId, cursorFactors) => {
        const myObject = getElementById(targetId);
        if (!myObject) return;
        const rect = myObject.getBoundingClientRect();
        const rectInPercentages = rectangleBuilder(rect, cursorFactors);
        reducerFunctions.cursorFunctions.changeLocation(rectInPercentages);
      };
      
      const toggleBigHover = (bigHoverStruct, cursorFactors) => {
        if (!bigHoverStruct) return;
        const { myId, parentId, active } = bigHoverStruct;
        const newBigHover = { myId, parentId, active: !active };
        reducerFunctions.navigationFunctions.setBigHover(newBigHover);
        rerenderCursor(active ? myId : parentId, cursorFactors);
      };
    
      return {toggleLoad, scrollUp, scrollDown, changeLanguage, setNextMenu, triggerMenu, getElementById, rectangleBuilder,
        toggleBigHover, rerenderCursor
      };
}