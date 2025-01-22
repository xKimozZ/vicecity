import { buttonGroups } from "../../constants/buttonGroups";
import { languageMap } from "../../constants/menuStrings";

export const auxilaryFunctions = (reducerFunctions) => {
    const { navigationFunctions, miscFunctions, localizationFunctions } = reducerFunctions;

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

      const setNextMenu = (nextMenu) => navigationFunctions.setNextGroup(nextMenu);
    
      return {toggleLoad, scrollUp, scrollDown, changeLanguage, setNextMenu, triggerMenu};
}