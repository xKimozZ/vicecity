import { actionNames } from "../../constants/actionNames";
import { buttonGroups } from "../../constants/buttonGroups";
import { auxilaryFunctions } from "./auxilaryFunctions";

const handleMenuEvents = (globalActions, reducerFunctions) => {

  const { playHover, playSelect, playError, playBack } = globalActions.sounds;
  const { backToNavigation } = globalActions.navigation;
  const { toggleLoad, changeLanguage, scrollDown, scrollUp, triggerMenu, setNextMenu,
    getElementById, rectangleBuilder,
   } = auxilaryFunctions(reducerFunctions);

  var dynamicVariables;
  const updateParams = (newDynamicVariables) => {
    dynamicVariables = newDynamicVariables;
  };

  const handleLoad = (eventType, actionList) => {
    switch (eventType) {
      case "select":
        const { trigger: nextAction, fileExists } = dynamicVariables;
        console.log(nextAction);
        if (nextAction === actionNames.loadGame) {
          toggleLoad(dynamicVariables.hoveredOption);
          playHover();
        }
        if (fileExists !== undefined) {
          if (fileExists) {
            playSelect();
          } else playError();
        }
        break;
      case "hover":
        break;
      case "back":
        const { shouldExitMenu } = actionList;
        playBack();
        // If user clicks at bottom or if already hovering on the first phase
        if (shouldExitMenu) {
          backToNavigation();
          return;
        }
        toggleLoad(dynamicVariables.hoveredOption);
        break;
      default:
        console.log("INVALID EVENT TYPE!");
        break;
    }
  };

  const handleStats = (eventType, actionList) => {
    switch (eventType) {
      case "select":
        backToNavigation();
        playHover();
        break;
      case "hover":
        const { direction } = actionList;
        direction === "up" ? scrollUp() : scrollDown();
        break;
      case "back":
        break;
      default:
        console.log("INVALID EVENT TYPE!");
        break;
    }
  };

  const handleMain = (eventType, actionList) => {
    switch (eventType) {
      case "select":
        const { nextMenu } = dynamicVariables;

        // If true -- allowed to enter the menu (all except brief), return true and play the sound
        if (triggerMenu(nextMenu)) playSelect();
        break;
      case "hover":
        const { newMenu } = actionList;
        setNextMenu(newMenu);
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
        const { nextLanguage, currentLanguage } = dynamicVariables;
        changeLanguage(nextLanguage, currentLanguage);
        playHover();
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

  const handleDisplay = (eventType, actionList) => {
    switch (eventType) {
      case "select":
        {
          if (dynamicVariables.trigger === "brightness")
          {
              // If I click on it again, disable the bigHover
              if (dynamicVariables.bigHover.active)
              {
                const myObject = getElementById(dynamicVariables.bigHover.myId);
                const rect = myObject.getBoundingClientRect();
                const rectInPercentages = rectangleBuilder(rect);
                playHover();
                
                const newBigHover = {...dynamicVariables.bigHover, active: false};
                reducerFunctions.navigationFunctions.setBigHover(newBigHover);
                reducerFunctions.cursorFunctions.changeLocation(rectInPercentages);
                return;
              }

              console.log(dynamicVariables.bigHover.myId);
              console.log(dynamicVariables.bigHover.parentId);
              const parentObject = getElementById(dynamicVariables.bigHover.parentId);
              const rect = parentObject.getBoundingClientRect();
              const cursorFactors = {
                clipFactor: 3,
                topFactor: 0.95,
                leftFactor: 1,
                widthFactor: 1.11,
                heightFactor: 1.3,
              };
              const rectInPercentages = rectangleBuilder(rect, cursorFactors);
      
              reducerFunctions.cursorFunctions.changeLocation(rectInPercentages);

              const newBigHover = {...dynamicVariables.bigHover, active: true};
              reducerFunctions.navigationFunctions.setBigHover(newBigHover);
              playHover();
          }
        }
        break;
      case "hover":
        {
          const { newMenu } = actionList;
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

  const handleSelectGeneral = () => {
    switch (dynamicVariables.activeButtonGroup) {
      case buttonGroups.MAIN:
        handleMain("select");
        break;
      case buttonGroups.LANGUAGE:
        handleLanguage("select");
        break;
      case buttonGroups.LOAD:
        handleLoad("select");
        break;
      case buttonGroups.STATS:
        handleStats("select");
        break;
      default:
        break;
    }
  };

  return { handleLoad, handleStats, handleMain, handleLanguage, handleDisplay, handleSelectGeneral, updateParams };
};

export default handleMenuEvents;
