import { actionNames } from "../constants/actionNames";

const handleMenuEvents = (globalActions) => {

  const { playHover, playSelect, playError, playBack } = globalActions.sounds;
  const { exitMenu, triggerMenu } = globalActions.navigation;
  const { toggleLoad, changeLanguage, scrollDown, scrollUp, setNextMenu } = globalActions.misc;

  const handleLoad = (eventType, actionList) => {
    switch (eventType) {
      case "select":
        {
          const { nextAction, fileExists } = actionList;
          if (nextAction === actionNames.loadGame) {
            toggleLoad();
            playHover();
          }
          if (fileExists !== undefined) {
            if (fileExists) {
              playSelect();
            } else playError();
          }
        }
        break;
      case "hover":
        {
        }
        break;
      case "back":
        {
          const { shouldExitMenu } = actionList;

          playBack();
          // If user clicks at bottom or if already hovering on the first phase
          if (shouldExitMenu) {
            exitMenu();
            return;
          }
          toggleLoad();
        }
        break;
      default:
        console.log("INVALID EVENT TYPE!");
        break;
    }
  };

  const handleStats = (eventType, actionList) => {
    switch (eventType) {
      case "select":
        {
          exitMenu();
          playHover();
        }
        break;
      case "hover":
        {
          const { direction } = actionList;
          direction === "up" ? scrollUp() : scrollDown();
        }
        break;
      case "back":
        {
          exitMenu();
          playBack();
        }
        break;
      default:
        console.log("INVALID EVENT TYPE!");
        break;
    }
  };

  const handleMain = (eventType, actionList) => {
    switch (eventType) {
      case "select":
        {
          const { nextMenu } = actionList;

          // If true -- allowed to enter the menu (all except brief), return true and play the sound
          if (triggerMenu(nextMenu)) playSelect();
        }
        break;
      case "hover":
        {
          const { newMenu, setNextMenu } = actionList;
          setNextMenu(newMenu);
        }
        break;
      case "back":
        break;
      default:
        console.log("INVALID EVENT TYPE!");
        break;
    }
  };

  const handleLanguage = (eventType, actionList) => {
    switch (eventType) {
      case "select":
        {
          const { nextLanguage } = actionList;
          changeLanguage(nextLanguage);
          playHover();
        }
        break;
      case "hover":
        break;
      case "back":
        break;
      default:
        console.log("INVALID EVENT TYPE!");
        break;
    }
  };

  return { handleLoad, handleStats, handleMain, handleLanguage };
};

export default handleMenuEvents;
