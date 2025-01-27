import { useReduxAbstractorContext } from "../../context/ReduxAbstractorContext";
import useSoundManager from "../useSoundManager";
import useDebounce from "../useDebounce";
import { actionNames } from "../../constants/actionNames";

const { HOVER, SELECT, BACK, SPECIAL } = actionNames.GENERAL;
const { DIRECTION_RIGHT, DIRECTION_LEFT, DIRECTION_UP, DIRECTION_DOWN } = actionNames.ARROWS;

const {
    BRIGHTNESS_ID,
    TRAILS_ID,
    SUBTITLES_ID,
    WIDESCREEN_ID,
    RADAR_ID,
    HUD_ID,
    SCREENPOS_ID,
    RADAR_MAPBLIPS,
    RADAR_OFF,
} = actionNames.DISPLAY;

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
  const { bigHover, currentActions } = selectorAbstractor.navigationState;
  const { displaySettings } = selectorAbstractor.miscState;
  const { trigger: optionId } = currentActions;

  const selectCase = () => {
    switch(optionId)
          {
            case SCREENPOS_ID:
                  const cursorFactors = bigHover.active ? null : DEFAULT_FACTORS;
                  toggleBigHover(cursorFactors);
                  playSelect();
              break;
            case BRIGHTNESS_ID:
              toggleBigHover(DEFAULT_FACTORS);
              playHover();
              break;
            
            case TRAILS_ID:
            case SUBTITLES_ID:
            case WIDESCREEN_ID:
            case HUD_ID:
              {  
                playSelect();
                const { myId, parentId, always } = bigHover;
                const targetId = always ? parentId : myId;
                const newDisplaySettings = { ...displaySettings, [myId]: !displaySettings[myId] };
                miscFunctions.setDisplaySettings(newDisplaySettings);
                break;
              } 
            case RADAR_ID:
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
          case BRIGHTNESS_ID:
            if (bigHover.active && bigHover.myId === BRIGHTNESS_ID) {
        
              const currentBrightness = displaySettings[BRIGHTNESS_ID];
              if (direction === DIRECTION_UP || direction === DIRECTION_DOWN ) return;
              let sign = direction === DIRECTION_LEFT ? -1 : 1;
              
              const newBrightness = incrementBar(currentBrightness, sign, playSoundAfterDelay);
              updateBrightness(newBrightness);

              const newDisplaySettings = {...displaySettings,[BRIGHTNESS_ID]: newBrightness,};
              miscFunctions.setDisplaySettings(newDisplaySettings);
             }
             break;
          case RADAR_ID:
            if (bigHover.active && bigHover.myId === RADAR_ID) {
              let sign;
              if (direction === DIRECTION_LEFT) sign = -1; else if (direction === DIRECTION_RIGHT) sign = 1; else return;
              const currentOption = displaySettings[RADAR_ID];
              let newOption = currentOption + sign;
              if (newOption < RADAR_MAPBLIPS) newOption = RADAR_OFF;
              if (newOption > RADAR_OFF) newOption = RADAR_MAPBLIPS;
              const newDisplaySettings = {...displaySettings,[RADAR_ID]: newOption};
              miscFunctions.setDisplaySettings(newDisplaySettings);
              playSelect();
              }
              break;
          case SCREENPOS_ID:
            if (bigHover.active && bigHover.myId === SCREENPOS_ID) {
              const isInX = direction === DIRECTION_LEFT || direction === DIRECTION_RIGHT;
              const isInY = direction === DIRECTION_UP || direction === DIRECTION_DOWN;
              const sign = direction === DIRECTION_LEFT || direction === DIRECTION_UP ? -1 : 1;
              
              const {x:oldX, y:oldY} = displaySettings[SCREENPOS_ID];
              let newX = oldX;
              let newY = oldY;

              if (isInX) newX = oldX + sign;
              if (isInY) newY = oldY + sign;
              
              const viewportWidth = window.innerWidth;
              const viewportHeight = window.innerHeight;
              
              if (Math.abs(newX) > viewportWidth / 2 || Math.abs(newY) > viewportHeight / 2) return;
              const newOption = {x: newX, y: newY};
              const newDisplaySettings = {...displaySettings,[SCREENPOS_ID]: newOption};
              miscFunctions.setDisplaySettings(newDisplaySettings);
              }
              break;
        }
      } catch {
        console.log("SLOW DOWN!!!")
      }
  }

  const specialCase = (barSelected) => {
    if (bigHover.active && bigHover.myId === BRIGHTNESS_ID)
        {
          const newBrightness = (barSelected / 16);
          const newDisplaySettings = {...displaySettings,[BRIGHTNESS_ID]: newBrightness,};
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