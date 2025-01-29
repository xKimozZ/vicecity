import { useReduxAbstractorContext } from "../../context/ReduxAbstractorContext";
import useSoundManager from "../useSoundManager";
import useDebounce from "./useDebounce";
import { useEffect } from "react";
import { actionNames } from "../../constants/actionNames";
import { buttonGroups } from "../../constants/buttonGroups";
import { elementIds } from "../../constants/elementIds";

const { HOVER, SELECT, BACK, SPECIAL } = actionNames.GENERAL;
const { DIRECTION_RIGHT, DIRECTION_LEFT, DIRECTION_UP, DIRECTION_DOWN } = actionNames.ARROWS;

const {
    BRIGHTNESS_ACTION,
    TRAILS_ACTION,
    SUBTITLES_ACTION,
    WIDESCREEN_ACTION,
    RADAR_ACTION,
    HUD_ACTION,
    SCREENPOS_ACTION,
    RADAR_MAPBLIPS,
    RADAR_OFF,
} = actionNames.DISPLAY;
const { FRONTEND_ROOT_ID } = elementIds.FRONTEND;

// Note this is used mostly for the big hover stuff
const DEFAULT_FACTORS = {
    clipFactor: 3,
    topFactor: 0.95,
    leftFactor: 1,
    widthFactor: 1.11,
    heightFactor: 1.3,
  };

const useDisplayEvents = (globalHookFunctions) => {
  const { toggleBigHover, incrementBar, updateBrightness } = globalHookFunctions;
  const { playSoundAfterDelay } = useDebounce();
  const { playHover, playSelect } = useSoundManager();

  const { dispatchAbstractor, selectorAbstractor } = useReduxAbstractorContext();
  const { miscFunctions } = dispatchAbstractor;
  const { bigHover, currentActions, activeButtonGroup } = selectorAbstractor.navigationState;
  const { displaySettings } = selectorAbstractor.miscState;
  const { trigger: optionId } = currentActions;

  const fakeScreenPosStyle = {
    position: "fixed",
    top: "6px",
    left: "6px",
    height: "calc(99.3vh - 12px)",
    width: "calc(99.3vw - 12px)",
    border: "6px solid yellow",
    transform: `translate(${displaySettings[SCREENPOS_ACTION].x}px, ${displaySettings[SCREENPOS_ACTION].y}px)`,
  };

  const FAKE_BORDER_ID = "fake-border"

  const createFakeBorder = () => {
    const newElement = document.createElement("div");
    newElement.id = FAKE_BORDER_ID;
    Object.assign(newElement.style, fakeScreenPosStyle);

    const rootElement = document.getElementById(FRONTEND_ROOT_ID);
    rootElement.appendChild(newElement);
  };

  const destroyFakeBorder = () => {
    const existingElement = document.getElementById(FAKE_BORDER_ID);
    existingElement && existingElement.remove();
  }

  useEffect(() => {
    if (activeButtonGroup !== buttonGroups.DISPLAY || !bigHover.active) destroyFakeBorder();
  }, [activeButtonGroup, bigHover]);

  useEffect(() => {
    globalHookFunctions.updateScreenPos();
  }, [displaySettings[SCREENPOS_ACTION]]);

  const selectCase = () => {
    switch(optionId)
          {
            case SCREENPOS_ACTION:
                  const cursorFactors = bigHover.active ? null : DEFAULT_FACTORS;
                  bigHover.active ? destroyFakeBorder() : createFakeBorder();
                  toggleBigHover(cursorFactors);
                  playSelect();
              break;
            case BRIGHTNESS_ACTION:
              toggleBigHover(DEFAULT_FACTORS);
              playHover();
              break;
            
            case TRAILS_ACTION:
            case SUBTITLES_ACTION:
            case WIDESCREEN_ACTION:
            case HUD_ACTION:
              {  
                playSelect();
                const { myId, parentId, always } = bigHover;
                const targetId = always ? parentId : myId;
                const newDisplaySettings = { ...displaySettings, [myId]: !displaySettings[myId] };
                miscFunctions.setDisplaySettings(newDisplaySettings);
                break;
              } 
            case RADAR_ACTION:
              {
                playHover();
                toggleBigHover();
                break
              }
          }
  }

  const hoverCase = (direction) => {
    try {
        switch (optionId) {
          case BRIGHTNESS_ACTION:
            if (bigHover.active && bigHover.myId === BRIGHTNESS_ACTION) {
        
              const currentBrightness = displaySettings[BRIGHTNESS_ACTION];
              if (direction === DIRECTION_UP || direction === DIRECTION_DOWN ) return;
              let sign = direction === DIRECTION_LEFT ? -1 : 1;
              
              const newBrightness = incrementBar(currentBrightness, sign, playSoundAfterDelay);
              updateBrightness(newBrightness);

              const newDisplaySettings = {...displaySettings,[BRIGHTNESS_ACTION]: newBrightness,};
              miscFunctions.setDisplaySettings(newDisplaySettings);
             }
             break;
          case RADAR_ACTION:
            if (bigHover.active && bigHover.myId === RADAR_ACTION) {
              let sign;
              if (direction === DIRECTION_LEFT) sign = -1; else if (direction === DIRECTION_RIGHT) sign = 1; else return;
              const currentOption = displaySettings[RADAR_ACTION];
              let newOption = currentOption + sign;
              if (newOption < RADAR_MAPBLIPS) newOption = RADAR_OFF;
              if (newOption > RADAR_OFF) newOption = RADAR_MAPBLIPS;
              const newDisplaySettings = {...displaySettings,[RADAR_ACTION]: newOption};
              miscFunctions.setDisplaySettings(newDisplaySettings);
              playSelect();
              }
              break;
          case SCREENPOS_ACTION:
            if (bigHover.active && bigHover.myId === SCREENPOS_ACTION) {
              const isInX = direction === DIRECTION_LEFT || direction === DIRECTION_RIGHT;
              const isInY = direction === DIRECTION_UP || direction === DIRECTION_DOWN;
              const sign = direction === DIRECTION_LEFT || direction === DIRECTION_UP ? -1 : 1;
              
              const {x:oldX, y:oldY} = displaySettings[SCREENPOS_ACTION];
              let newX = oldX;
              let newY = oldY;

              if (isInX) newX = oldX + sign;
              if (isInY) newY = oldY + sign;
              
              const viewportWidth = window.innerWidth;
              const viewportHeight = window.innerHeight;
              
              if (Math.abs(newX) > viewportWidth / 2 || Math.abs(newY) > viewportHeight / 2) return;
              
              const newOption = {x: newX, y: newY};
              
              const newDisplaySettings = {...displaySettings,[SCREENPOS_ACTION]: newOption};
              miscFunctions.setDisplaySettings(newDisplaySettings);
              }
              break;
        }
      } catch {
        console.log("SLOW DOWN!!!")
      }
  }

  const specialCase = (barSelected) => {
    if (bigHover.active && bigHover.myId === BRIGHTNESS_ACTION)
        {
          const newBrightness = (barSelected / 16);
          updateBrightness(newBrightness);
          const newDisplaySettings = {...displaySettings,[BRIGHTNESS_ACTION]: newBrightness,};
          miscFunctions.setDisplaySettings(newDisplaySettings);
          playSelect();
        }
  }

  const handleDisplay = (eventType, param) => {
    switch (eventType) {
      case SELECT:
        selectCase();
        break;
      case HOVER:
        hoverCase(param);
        break;
      case SPECIAL:
        // If clicked directly on the brightness bar
        specialCase(param);
        break;
      case BACK:
      default:
        break;
    }
  };

  return { handleDisplay };
};

export default useDisplayEvents;