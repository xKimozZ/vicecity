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
    stringControlsSelector,
    stringMapSelector,
    stringAudioSelector,
} from "../../store/localizationSlice";

const useSelectorAbstractor = () => {
    // Strings
    const languageState = useSelector(languageSelector);
    const stringMenuState = useSelector(stringMenuSelector);
    const stringBriefState = useSelector(stringBriefSelector);
    const stringMapState = useSelector(stringMapSelector);
    const stringLoadState = useSelector(stringLoadSelector);
    const stringStatsState = useSelector(stringStatsSelector);
    const stringLanguageState = useSelector(stringLanguageSelector);
    const stringDisplayState = useSelector(stringDisplaySelector);
    const stringControlsState = useSelector(stringControlsSelector);
    const stringNavState = useSelector(stringNavSelector);
    const stringAudioState = useSelector(stringAudioSelector);
    
    const navigationState = useSelector(navigationSelector);
    const miscState = useSelector(miscSelector);
    const cursorState = useSelector(cursorSelector);
    const localizationState = { languageState, stringMapState, stringMenuState, stringBriefState, stringLoadState, stringStatsState, stringLanguageState, stringDisplayState, stringControlsState, stringNavState, stringAudioState };
  
  return { navigationState, miscState, cursorState, localizationState };
};

export default useSelectorAbstractor;
