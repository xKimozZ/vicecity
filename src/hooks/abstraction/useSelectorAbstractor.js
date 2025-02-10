import { useSelector } from "react-redux";
import { navigationSelector } from "../../store/navigationSlice";
import { miscSelector } from "../../store/miscSlice";
import { cursorSelector } from "../../store/cursorSlice";
import { 
    languageSelector, 
    stringMenuSelector, 
    stringBriefSelector, 
    stringLoadSelector, 
    stringStatsSelector, 
    stringLanguageSelector, 
    stringDisplaySelector,
    stringNavSelector,
} from "../../store/localizationSlice";

const useSelectorAbstractor = () => {
    // Strings
    const languageState = useSelector(languageSelector);
    const stringMenuState = useSelector(stringMenuSelector);
    const stringBriefState = useSelector(stringBriefSelector);
    const stringLoadState = useSelector(stringLoadSelector);
    const stringStatsState = useSelector(stringStatsSelector);
    const stringLanguageState = useSelector(stringLanguageSelector);
    const stringDisplayState = useSelector(stringDisplaySelector);
    const stringNavState = useSelector(stringNavSelector);

    const navigationState = useSelector(navigationSelector);
    const miscState = useSelector(miscSelector);
    const cursorState = useSelector(cursorSelector);
    const localizationState = { languageState, stringMenuState, stringBriefState, stringLoadState, stringStatsState, stringLanguageState, stringDisplayState, stringNavState };
  
  return { navigationState, miscState, cursorState, localizationState };
};

export default useSelectorAbstractor;
