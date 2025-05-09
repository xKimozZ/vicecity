import { useReduxAbstractorContext } from "../../context/ReduxAbstractorContext";
import { buttonGroups } from "../../constants/buttonGroups";
import { actionNames } from "../../constants/actionNames";
import { elementIds } from "../../constants/elementIds";

const { BRIGHTNESS_ID, SCREENPOS_ID } = actionNames.DISPLAY;
const { FRONTEND_ROOT_ID, FRONTEND_BACKGROUND_ID, FRONTEND_CONTAINER_ID } = elementIds.FRONTEND;

const FAKE_BORDER_ID = "fake-border"

const useGlobalEvents = () => {
  const { dispatchAbstractor, selectorAbstractor } = useReduxAbstractorContext();
  const { bigHover, activeButtonGroup, hoveredOption } = selectorAbstractor.navigationState;
  const { displaySettings } = selectorAbstractor.miscState;
  const { navigationFunctions, cursorFunctions, miscFunctions } = dispatchAbstractor;

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

  const rerenderCursor = (target, cursorFactors) => {
    let targetElement;
    if (typeof target === 'string') {
      targetElement = document.getElementById(target);
    } else if (target instanceof Element) {
      targetElement = target;
    } else {
      console.error('Invalid target provided to rerenderCursor');
      return;
    }
    
    const rect = targetElement.getBoundingClientRect();
    const rectInPercentages = rectangleBuilder(rect, cursorFactors);
    const identityStruct = {buttonNumber: hoveredOption, buttonGroup: activeButtonGroup};
    cursorFunctions.changeLocation({...rectInPercentages, identityStruct});
  };

  const toggleBigHover = () => {
    const { active } = bigHover;
    const newBigHover = { ...bigHover, active: !active };
    navigationFunctions.setBigHover(newBigHover);
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

  const updateBrightness = (newValue) => {
    let brightnessValue = newValue !== undefined ? newValue : displaySettings[BRIGHTNESS_ID];
    const rootElement = document.getElementById(FRONTEND_ROOT_ID);
    rootElement.style.filter = `brightness(${ brightnessValue + 0.08})`;
  }

  const updateScreenPos = (newValue) => {
    let screenPosValue = newValue && newValue.x && newValue.y ? newValue : displaySettings[SCREENPOS_ID];

    const borderElement = document.getElementById(FAKE_BORDER_ID);
    const appContainerElement = document.getElementById(FRONTEND_CONTAINER_ID);
    const backgroundElement = document.getElementById(FRONTEND_BACKGROUND_ID);

    if (!borderElement || !appContainerElement || !backgroundElement) return;

    borderElement.style.transform = `translate(${screenPosValue.x}px, ${screenPosValue.y}px)`;
    appContainerElement.style.transform = `translate(${screenPosValue.x}px, ${screenPosValue.y}px)`;
    backgroundElement.style.transform = `translate(${screenPosValue.x}px, ${screenPosValue.y}px)`;
  }

  return {backToNavigation, triggerMenu, setNextMenu, rectangleBuilder, rerenderCursor, toggleBigHover,
     incrementBar, updateBrightness, updateScreenPos};
};

export default useGlobalEvents;
