import useSoundManager from "../useSoundManager";
import useDispatchAbstractor from "../useDispatchAbstractor";
import { actionNames } from "../../constants/actionNames";

const { HOVER, SELECT, BACK } = actionNames.GENERAL;
const { DIRECTION_UP, DIRECTION_DOWN } = actionNames.ARROWS;

const useStatsEvents = (globalHookFunctions) => {
  const { playHover } = useSoundManager();
  const { miscFunctions } = useDispatchAbstractor();
  const { backToNavigation } = globalHookFunctions;

  const scrollUp = () => {
    miscFunctions.incrementStatsTranslate(1);
    miscFunctions.toggleStatsDirection("up");
  };

  const scrollDown = () => {
    miscFunctions.decrementStatsTranslate(1);
    miscFunctions.toggleStatsDirection("down");
  };

  const handleStats = (eventType, direction) => {
    switch (eventType) {
      case SELECT:
        backToNavigation();
        playHover();
        break;
      case HOVER:
        direction === DIRECTION_UP ? scrollUp() : scrollDown();
        break;
      case BACK:
      default:
        break;
    }
  };

  return { handleStats }
};

export default useStatsEvents;