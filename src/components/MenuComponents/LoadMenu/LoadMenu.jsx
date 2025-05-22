import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import { useEventHandlerContext } from "../../../context/EventHandlerContext";
import { useEffect } from "react";
import Button from "../../Button/Button";
import styles from "./LoadMenu.module.css";
import SaveGame from "./SaveGame";
import { buttonGroups, buttonIndices } from "../../../constants/buttonGroups";
import { actionNames } from "../../../constants/actionNames";
import { elementIds } from "../../../constants/elementIds";

const {
  LOAD_GAME,
  NEW_GAME,
  SAVE_SLOT_1,
  SAVE_SLOT_2,
  SAVE_SLOT_3,
  SAVE_SLOT_4,
  SAVE_SLOT_5,
  SAVE_SLOT_6,
  SAVE_SLOT_7,
  SAVE_SLOT_8,
} = buttonIndices.LOAD;


const { FRONTEND_ROOT_ID } = elementIds.FRONTEND;
const PANEL_ID = "load-panel";
const PANEL_BG_ID = "load-panel-background"

const LOAD_CURSOR_FACTORS = {
  clipFactor: 9,
  topFactor: 1.005,
  maxTopFactor: 1.01,
  leftFactor: 1.005,
  maxLeftFactor: 1.01,
  widthFactor: 1,
  heightFactor: 1.03,
};

const LoadMenu = () => {
  const { selectorAbstractor } = useReduxAbstractorContext();
  const { handleHover, handleBack } = useEventHandlerContext();
  const strings = selectorAbstractor.localizationState.stringLoadState;
  const { hoveredOption, activeButtonGroup } = selectorAbstractor.navigationState;

  useEffect(() => {
    const updatePosition = () => {
      const panel = document.getElementById(PANEL_ID);
      const panelRect = panel.getBoundingClientRect();

      const existingElement = document.getElementById(PANEL_BG_ID);
      if (existingElement) {
        existingElement.remove();
      }

      const newElement = document.createElement("div");
      newElement.id = PANEL_BG_ID;
      newElement.className = styles.loadPanelBackground;
      Object.assign(newElement.style, {
        position: "absolute",
        top: `${panelRect.top}px`,
        left: `${panelRect.left}px`,
        width: `${panelRect.width}px`,
        height: `${panelRect.height}px`,
      });

      const rootElement = document.getElementById(FRONTEND_ROOT_ID);
      rootElement.appendChild(newElement);
    };
    updatePosition();

    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("resize", updatePosition);
      const existingElement = document.getElementById(PANEL_BG_ID);
      if (existingElement) {
        existingElement.remove();
      }
    };
  }, []);

  const isChoosingSaveGames = hoveredOption >= SAVE_SLOT_1 && activeButtonGroup === buttonGroups.LOAD;
  const isPhase1 = () => {
    return !isChoosingSaveGames;
  };

  return (
    <div className={styles.loadContainer}>
      <div className={styles.loadButtonContainer}>
      <div className={styles.loadButton} onClick={isChoosingSaveGames ? () => handleBack() : undefined}>
      <Button
        buttonNumber={LOAD_GAME}
        buttonGroup={buttonGroups.LOAD}
        textColor="var(--pink)"
        buttonText={strings.loadgame}
        actions={{trigger: actionNames.LOAD.LOADGAME }}
        cursorFactors={LOAD_CURSOR_FACTORS}
        activeCondition={()=> isPhase1()}
        />
      </div>
      <div className={styles.loadButton} onClick={isChoosingSaveGames ? () => handleBack() : undefined}>
      <Button
        buttonNumber={NEW_GAME}
        buttonGroup={buttonGroups.LOAD}
        textColor="var(--pink)"
        buttonText={strings.newgame}
        actions={{trigger: actionNames.LOAD.NEWGAME }}
        cursorFactors={LOAD_CURSOR_FACTORS}
        activeCondition={()=> isPhase1()}
      />
      </div>
      </div>
      <div id={PANEL_ID} className={styles.loadPanel} onClick={!isChoosingSaveGames ? () => handleHover(SAVE_SLOT_1) : undefined}>
        <div className={styles.loadFlex}>
          <SaveGame buttonNumber={SAVE_SLOT_1} slotNumber={1} saveFile={{name: "In the beginning...", date: new Date("2002-10-26 18:46:13")}}/>
          <SaveGame buttonNumber={SAVE_SLOT_2} slotNumber={2}/>
          <SaveGame buttonNumber={SAVE_SLOT_3} slotNumber={3}/>
          <SaveGame buttonNumber={SAVE_SLOT_4} slotNumber={4} saveFile={{name: "All Hands on Deck!", date: new Date("2003-7-6 16:32:07")}}/>
          <SaveGame buttonNumber={SAVE_SLOT_5} slotNumber={5}/>
          <SaveGame buttonNumber={SAVE_SLOT_6} slotNumber={6} saveFile={{name: "Cap the Collector", date: new Date("2019-12-31 23:48:59")}}/>
          <SaveGame buttonNumber={SAVE_SLOT_7} slotNumber={7} saveFile={{name: "Keep your Friends Close...", date: new Date("2000-1-1 09:17:48")}}/>
          <SaveGame buttonNumber={SAVE_SLOT_8} slotNumber={8}/>
        </div>
      </div>
    </div>
  );
};

export default LoadMenu;
