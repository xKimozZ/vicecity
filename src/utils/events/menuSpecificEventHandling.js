import { actionNames } from "../../constants/actionNames";
import { buttonGroups } from "../../constants/buttonGroups";
import { auxilaryFunctions } from "./auxilaryFunctions";

const handleMenuEvents = (globalActions, reducerFunctions) => {
  const { playHover, playSelect, playError, playBack, playSoundAfterDelay } = globalActions.sounds;
  const { backToNavigation } = globalActions.navigation;
  const { toggleLoad, changeLanguage, scrollDown, scrollUp, triggerMenu, setNextMenu,
    getElementById, rectangleBuilder, rerenderCursor, toggleBigHover, incrementBar,
   } = auxilaryFunctions(reducerFunctions);

  var dynamicVariables;
  const updateParams = (newDynamicVariables) => {
    dynamicVariables = newDynamicVariables;
  };

  const handleLoad = (eventType, actionList) => {
    switch (eventType) {
      case "select":
        const { trigger: nextAction, fileExists } = dynamicVariables;
        if (nextAction === actionNames.LOAD.LOADGAME) {
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
          switch(dynamicVariables.trigger)
          {
            case actionNames.DISPLAY.SCREENPOS_ID:
              {
                  const cursorFactors = dynamicVariables.bigHover.active ? null : {
                    clipFactor: 3,
                    topFactor: 0.95,
                    leftFactor: 1,
                    widthFactor: 1.11,
                    heightFactor: 1.3,
                  };
                  toggleBigHover(dynamicVariables.bigHover, cursorFactors);
                  playSelect();
              }
              break;
            case actionNames.DISPLAY.BRIGHTNESS_ID:
              // If I click on it again, disable the bigHover
              const cursorFactors = {
                clipFactor: 3,
                topFactor: 0.95,
                leftFactor: 1,
                widthFactor: 1.11,
                heightFactor: 1.3,
              };
              toggleBigHover(dynamicVariables.bigHover, cursorFactors);
              playHover();
              break;
            
            case actionNames.DISPLAY.TRAILS_ID:
            case actionNames.DISPLAY.SUBTITLES_ID:
            case actionNames.DISPLAY.WIDESCREEN_ID:
            case actionNames.DISPLAY.HUD_ID:
              {  
                playSelect();
                const { myId, parentId, always } = dynamicVariables.bigHover;
                const targetId = always ? parentId : myId;
                rerenderCursor(targetId);
                const newDisplaySettings = { ...dynamicVariables.displaySettings, [myId]: !dynamicVariables.displaySettings[myId] };
                reducerFunctions.miscFunctions.setDisplaySettings(newDisplaySettings);
                break;
              } 
            case actionNames.DISPLAY.RADAR_ID:
              {
                playHover();
                toggleBigHover(dynamicVariables.bigHover);
                break
              }
          }
        }
        break;
      case "hover":
        {
              try {
                const { direction } = actionList;
                switch (dynamicVariables.trigger) {
                  case actionNames.DISPLAY.BRIGHTNESS_ID:
                    if (dynamicVariables.bigHover.active && dynamicVariables.bigHover.myId === actionNames.DISPLAY.BRIGHTNESS_ID) {
                
                      const currentBrightness = dynamicVariables.displaySettings[actionNames.DISPLAY.BRIGHTNESS_ID];
                      const newBrightness = incrementBar(currentBrightness, direction, playSoundAfterDelay);
          
                      const newDisplaySettings = {...dynamicVariables.displaySettings,[actionNames.DISPLAY.BRIGHTNESS_ID]: newBrightness,};
                      reducerFunctions.miscFunctions.setDisplaySettings(newDisplaySettings);
                     }
                     break;
                  case actionNames.DISPLAY.RADAR_ID:
                    if (dynamicVariables.bigHover.active && dynamicVariables.bigHover.myId === actionNames.DISPLAY.RADAR_ID) {
                      const sign = direction === "left" ? -1 : 1;
                      const currentOption = dynamicVariables.displaySettings[actionNames.DISPLAY.RADAR_ID];
                      const { RADAR_MAPBLIPS, RADAR_OFF } = actionNames.DISPLAY;
                      let newOption = currentOption + sign;
                      if (newOption < RADAR_MAPBLIPS) newOption = RADAR_OFF;
                      if (newOption > RADAR_OFF) newOption = RADAR_MAPBLIPS;
                      const newDisplaySettings = {...dynamicVariables.displaySettings,[actionNames.DISPLAY.RADAR_ID]: newOption};
                      reducerFunctions.miscFunctions.setDisplaySettings(newDisplaySettings);
                      playSelect();
                      }
                      break;
                  case actionNames.DISPLAY.SCREENPOS_ID:
                    if (dynamicVariables.bigHover.active && dynamicVariables.bigHover.myId === actionNames.DISPLAY.SCREENPOS_ID) {
                      const sign = direction === "left" || direction === "up" ? -1 : 1;
                      const {x:oldX, y:oldY} = dynamicVariables.displaySettings[actionNames.DISPLAY.SCREENPOS_ID];
                      let newX = oldX;
                      let newY = oldY;
                      if (direction === "left" || direction === "right") newX = oldX + sign;
                      if (direction === "up" || direction === "down") newY = oldY + sign;
                      const viewportWidth = window.innerWidth;
                      const viewportHeight = window.innerHeight;
                      if (Math.abs(newX) > viewportWidth / 2 || Math.abs(newY) > viewportHeight / 2) return;
                      const newOption = {x:newX, y:newY};
                      const newDisplaySettings = {...dynamicVariables.displaySettings,[actionNames.DISPLAY.SCREENPOS_ID]: newOption};
                      reducerFunctions.miscFunctions.setDisplaySettings(newDisplaySettings);
                      }
                      break;
                }
              } catch {
                console.log("SLOW DOWN!!!")
              }
        }
        break;
      case "back":
        break;
      case "special":
        // If clicked directly on the brightness bar
        if (dynamicVariables.bigHover.active && dynamicVariables.bigHover.myId === actionNames.DISPLAY.BRIGHTNESS_ID)
        {
          const {barSelected} = actionList;
          const newBrightness = Math.round((barSelected / 16) * 100) / 100;
          const newDisplaySettings = {...dynamicVariables.displaySettings,[actionNames.DISPLAY.BRIGHTNESS_ID]: newBrightness,};
          reducerFunctions.miscFunctions.setDisplaySettings(newDisplaySettings);
          playSelect();
        }
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
      case buttonGroups.DISPLAY:
        handleDisplay("select");
        break;
      default:
        break;
    }
  };

  return { handleLoad, handleStats, handleMain, handleLanguage, handleDisplay, handleSelectGeneral, updateParams };
};

export default handleMenuEvents;
