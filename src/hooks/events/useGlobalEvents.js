import { useSelector } from "react-redux";
import useDispatchAbstractor from "../useDispatchAbstractor";
import { navigationSelector } from "../../store/navigationSlice";
import { buttonGroups } from "../../constants/buttonGroups";

const useGlobalEvents = () => {
  const { bigHover, activeButtonGroup } = useSelector(navigationSelector);
  const { navigationFunctions, cursorFunctions, miscFunctions } = useDispatchAbstractor();

  const backToNavigation = () => {
    navigationFunctions.setBigHover({
      ...bigHover,
      active: false,
    });
    navigationFunctions.setHoveredOption(activeButtonGroup);
    navigationFunctions.setButtonGroup(buttonGroups.MAIN);
  };

  const triggerMenu = (newMenu) => {
    if (newMenu === buttonGroups.BRIEF) return false;
    navigationFunctions.setButtonGroup(newMenu);
    navigationFunctions.setHoveredOption(1);
    return true;
  };

  // This basically controls what component/screen will be displayed
  const setNextMenu = (nextMenu) => {
    navigationFunctions.setNextGroup(nextMenu)
  };

  // Just generate the type of object that reaches cursorSlice, taking in the boundingClientRect and cursorFactors if present
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

  const rerenderCursor = (targetId, cursorFactors) => {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;
    const rect = targetElement.getBoundingClientRect();
    const rectInPercentages = rectangleBuilder(rect, cursorFactors);
    cursorFunctions.changeLocation(rectInPercentages);
  };

  const toggleBigHover = ( cursorFactors ) => {
    const { myId, parentId, active, always, twoStaged } = bigHover;
    const newBigHover = { ...bigHover, active: !active };
    navigationFunctions.setBigHover(newBigHover);
    let targetParentId = parentId;
    if (twoStaged && active) targetParentId = parentId + "2"; // This has `always` true since the highlight is not on myId itself
    rerenderCursor(active && !always ? myId : targetParentId, cursorFactors);
  };

  const incrementBar = (currentValue, sign = 1 , playSoundAfterDelay) => {
    const increment = 1 / 16;
    let newValue = currentValue + sign * increment;
    if (newValue < 0 || newValue > 1) {
      newValue = currentValue;
    }
    const time = Date.now();
    miscFunctions.setBarLastUpdate(time);
    playSoundAfterDelay(time);
    return newValue;
  };

  return {backToNavigation, triggerMenu, setNextMenu, rectangleBuilder, rerenderCursor, toggleBigHover, incrementBar};
};

export default useGlobalEvents;
