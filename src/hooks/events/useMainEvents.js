import { useReduxAbstractorContext } from "../../context/ReduxAbstractorContext";
import useSoundManager from "../useSoundManager";
import { actionNames } from "../../constants/actionNames";
import menuOptions from "../../constants/menuOptions";

const { HOVER, SELECT, BACK } = actionNames.GENERAL;

const useMainEvents = (globalHookFunctions) => {
  const { playSelect } = useSoundManager();
  const { triggerMenu, setNextMenu } = globalHookFunctions;

  const { selectorAbstractor } = useReduxAbstractorContext();
  const { currentActions } = selectorAbstractor.navigationState;

  const handleMain = (eventType, buttonNumber) => {
    switch (eventType) {
      case SELECT:
        // If true -- allowed to enter the menu (all except brief), return true and play the sound
        // This simply attempts to change the button group to what is inside `currentActions.nextMenu`
        const buttonGroupChanged = triggerMenu(currentActions.nextMenu);
        if (buttonGroupChanged) playSelect();
        break;
      case HOVER:
        // Get the next button group (the index of the page to be displayed in AppContainer)
        // expected from the menu options list and set it
        const newGroup = menuOptions[buttonNumber - 1].actions.nextMenu;
        setNextMenu(newGroup);
        break;
      case BACK:
      default:
        break;
    }
  };

  return { handleMain };
};

export default useMainEvents;
