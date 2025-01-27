import { useSelector } from "react-redux";
import { navigationSelector } from "../../store/navigationSlice";
import useSoundManager from "../useSoundManager";
import useDispatchAbstractor from "../useDispatchAbstractor";
import useGlobalEvents from "./useGlobalEvents";
import { actionNames } from "../../constants/actionNames";
import { buttonIndices } from "../../constants/buttonGroups";

const { HOVER, SELECT, BACK } = actionNames.GENERAL;

const { LOADGAME } = actionNames.LOAD;
const { PHASE1_LIST_START, PHASE2_LIST_START } = buttonIndices.LOAD;

const useLoadEvents = () => {
  const { backToNavigation } = useGlobalEvents();
  const { playHover, playSelect, playBack, playError } = useSoundManager();
  const { navigationFunctions } = useDispatchAbstractor();
  const { hoveredOption, currentActions } = useSelector(navigationSelector);

  const toggleLoad = (hoveredOption) => {
    hoveredOption < PHASE2_LIST_START
      ? navigationFunctions.setHoveredOption(PHASE2_LIST_START)
      : navigationFunctions.setHoveredOption(PHASE1_LIST_START);
  };

  const selectCase = () => {
    const { trigger: nextAction, fileExists } = currentActions;
    if (nextAction === LOADGAME) {
      toggleLoad(hoveredOption);
      playHover();
    }
    if (fileExists !== undefined) {
      if (fileExists) {
        playSelect();
      } else playError();
    }
  };

  const backCase = (forcedExit) => {
    playBack();
    // If user clicks at bottom or if already hovering on the first phase
    const shouldExitMenu = exitCondition(forcedExit);
    if (shouldExitMenu) backToNavigation();
    else toggleLoad(hoveredOption);
  };

  const exitCondition = (forcedExit) => forcedExit || hoveredOption < PHASE2_LIST_START;

  const handleLoad = (eventType, forcedExit) => {
    switch (eventType) {
      case SELECT:
        selectCase();
        break;
      case HOVER:
        break;
      case BACK:
        backCase(forcedExit);
        break;
      default:
        break;
    }
  };

  return { handleLoad };
};

export default useLoadEvents;
