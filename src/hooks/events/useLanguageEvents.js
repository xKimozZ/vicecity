import { useSelector } from "react-redux";
import { navigationSelector } from "../../store/navigationSlice";
import { languageSelector } from "../../store/localizationSlice";
import useSoundManager from "../useSoundManager";
import useDispatchAbstractor from "../useDispatchAbstractor";
import { actionNames } from "../../constants/actionNames";
import { languageMap } from "../../constants/menuStrings";

const { HOVER, SELECT, BACK } = actionNames.GENERAL;

const useLanguageEvents = () => {
  const { playHover } = useSoundManager();
  const { localizationFunctions } = useDispatchAbstractor();
  const { currentActions } = useSelector(navigationSelector);
  const currentLanguage = useSelector(languageSelector);

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
