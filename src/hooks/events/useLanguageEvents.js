import { useReduxAbstractorContext } from "../../context/ReduxAbstractorContext";
import useSoundManager from "../useSoundManager";
import { actionNames } from "../../constants/actionNames";
import { languageMap } from "../../constants/menuStrings";

const { HOVER, SELECT, BACK } = actionNames.GENERAL;

const useLanguageEvents = () => {
  const { playHover } = useSoundManager();

  const { dispatchAbstractor, selectorAbstractor } = useReduxAbstractorContext();
  const { localizationFunctions } = dispatchAbstractor;
  const { currentActions } = selectorAbstractor.navigationState;
  const currentLanguage = selectorAbstractor.localizationState.languageState;

  const changeLanguage = (newLanguage, currentLanguage) => {
    if (languageMap[newLanguage] && currentLanguage !== newLanguage)
      localizationFunctions.setLanguage(newLanguage);
  };

  const handleLanguage = (eventType) => {
    switch (eventType) {
      case SELECT:
        const nextLanguage = currentActions.nextLanguage;
        changeLanguage(nextLanguage, currentLanguage);
        playHover();
        break;
      case HOVER:
      case BACK:
      default:
        break;
    }
  };

  return { handleLanguage };
};

export default useLanguageEvents;
