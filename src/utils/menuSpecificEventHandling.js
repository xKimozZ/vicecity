const handleMenuEvents = () => {
  const handleLoad = (eventType, actionList) => {
    switch (eventType) {
      case "select":
        {
          const {
            nextAction,
            playHover,
            playError,
            playSelect,
            toggleLoad,
            fileExists,
          } = actionList;
          if (nextAction === "loadGame") {
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
          const { shouldExitMenu, exitMenu, playBack, playHover, toggleLoad } = actionList;
          
          // If user clicks at bottom or if already hovering on the first phase
          if (shouldExitMenu) {
            exitMenu();
            playBack();
            return;
          }
          toggleLoad();
          playHover();
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
          const { leaveStatsMenu } = actionList;
          leaveStatsMenu();
        }
        break;
      case "hover":
        {
          const { direction, scrollUp, scrollDown } = actionList;
          direction === "up" ? scrollUp() : scrollDown();
        }
        break;
      case "back":
        {
          const { leaveStatsMenu } = actionList;
          leaveStatsMenu();
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
          const { playSound, triggerMenu, nextMenu } = actionList;

          // If true -- allowed to enter the menu (all except brief), return true and play the sound
          if (triggerMenu(nextMenu)) playSound();
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
          const { playSound, changeLanguage, newLanguage } = actionList;
          changeLanguage(newLanguage);
          playSound();
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
