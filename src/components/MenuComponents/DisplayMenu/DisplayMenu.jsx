import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import { useEventHandlerContext } from "../../../context/EventHandlerContext";
import { useEffect } from "react";
import styles from "./DisplayMenu.module.css";
import Button from "../../Button/Button";
import Bar from "../../Bar/Bar";
import ColumnedList from "../../ColumnedList/ColumnedList";
import { imageImports } from "../../../assets/imageImports";
import { buttonGroups, buttonIndices } from "../../../constants/buttonGroups";
import { actionNames } from "../../../constants/actionNames";

const { BRIGHTNESS, TRAILS, SUBTITLES, WIDESCREEN, RADAR, HUD, SCREENPOS } = buttonIndices.DISPLAY;
const { BRIGHTNESS_ACTION, TRAILS_ACTION, SUBTITLES_ACTION, WIDESCREEN_ACTION, RADAR_ACTION, HUD_ACTION, SCREENPOS_ACTION, RADAR_MAPBLIPS, RADAR_BLIPSONLY, RADAR_OFF } = actionNames.DISPLAY;
const { DIRECTION_UP, DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT } = actionNames.ARROWS;

const BRIGHTNESS_WRAPPER = "brightness-wrapper";
const RADAR_CURSOR_FACTORS = {
  clipFactor: 7,
  topFactor: 1,
  leftFactor: 1,
  maxLeftFactor: 1.03,
  widthFactor: 1.01,
  minHeightFactor: 1.12,
  heightFactor: 1.18,
};

const DisplayMenu = () => {
  const { selectorAbstractor } = useReduxAbstractorContext();
  const { displaySettings } = selectorAbstractor.miscState;
  const { bigHover } = selectorAbstractor.navigationState;
  const strings = selectorAbstractor.localizationState.stringDisplayState;

  const { handleHover } = useEventHandlerContext();

  const Status = (key) => {
    if (key === RADAR_ACTION) {
      switch (displaySettings[RADAR_ACTION]) {
        case RADAR_MAPBLIPS:
          return strings.mapblips;
        case RADAR_BLIPSONLY:
          return strings.blipsonly;
        case RADAR_OFF:
          return strings.off;
      }
    }
    return displaySettings[key] ? strings.on : strings.off;
  };

  const colonOptions = [
    { stringKey: "trails", buttonNumber: TRAILS, buttonGroup: buttonGroups.DISPLAY, id: TRAILS_ACTION, isTwoStaged: false, dependencies: displaySettings[TRAILS_ACTION], getStatusString: Status, getOptionTextString: (key) => strings[key], cursorFactors: RADAR_CURSOR_FACTORS },
    { stringKey: "subtitles", buttonNumber: SUBTITLES, buttonGroup: buttonGroups.DISPLAY, id: SUBTITLES_ACTION, isTwoStaged: false, dependencies: displaySettings[SUBTITLES_ACTION], getStatusString: Status, getOptionTextString: (key) => strings[key], cursorFactors: RADAR_CURSOR_FACTORS },
    { stringKey: "widescreen", buttonNumber: WIDESCREEN, buttonGroup: buttonGroups.DISPLAY, id: WIDESCREEN_ACTION, isTwoStaged: false, dependencies: displaySettings[WIDESCREEN_ACTION], getStatusString: Status, getOptionTextString: (key) => strings[key], cursorFactors: RADAR_CURSOR_FACTORS },
    { stringKey: "radar", buttonNumber: RADAR, buttonGroup: buttonGroups.DISPLAY, id: RADAR_ACTION, isTwoStaged: true, dependencies: displaySettings[RADAR_ACTION], getStatusString: Status, getOptionTextString: (key) => strings[key], cursorFactors: RADAR_CURSOR_FACTORS },
    { stringKey: "hud", buttonNumber: HUD, buttonGroup: buttonGroups.DISPLAY, id: HUD_ACTION, isTwoStaged: false, dependencies: displaySettings[HUD_ACTION], getStatusString: Status, getOptionTextString: (key) => strings[key], cursorFactors: RADAR_CURSOR_FACTORS },
  ];

  const isChangingScreenPos = bigHover.active && bigHover.myId === SCREENPOS_ACTION;

  const changePosWithWheel = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (isChangingScreenPos) { 
      if (event.deltaY !== 0) event.deltaY > 0 ? handleHover(DIRECTION_DOWN) : handleHover(DIRECTION_UP);
      if (event.deltaX !== 0) event.deltaX > 0 ? handleHover(DIRECTION_LEFT) : handleHover(DIRECTION_RIGHT);
    }
  };

  useEffect(() => {
    if (isChangingScreenPos) 
    {
      window.addEventListener("wheel", changePosWithWheel);
      window.addEventListener("touchmove", changePosWithWheel);
    }
    
    return () => {
      window.removeEventListener("wheel", changePosWithWheel);
      window.removeEventListener("touchmove", changePosWithWheel);
    };
  }, [isChangingScreenPos, changePosWithWheel]);
  
  return (
    <div className={styles.displayContainer}>
      <div className={styles.displayBrightnessFlex} id={BRIGHTNESS_WRAPPER}>
        <Button
          buttonText={strings.brightness}
          buttonNumber={BRIGHTNESS}
          textColor="var(--pink)"
          buttonGroup={buttonGroups.DISPLAY}
          actions={{ trigger: BRIGHTNESS_ACTION }}
          id={BRIGHTNESS_ACTION}
          parentId={BRIGHTNESS_WRAPPER}
          additionalClassnames={[styles.displayButtonHeight]}
        />
        <Bar
          buttonNumber={BRIGHTNESS}
          buttonGroup={buttonGroups.DISPLAY}
          actions={{ trigger: BRIGHTNESS_ACTION }}
          id={BRIGHTNESS_ACTION}
          parentId={BRIGHTNESS_WRAPPER}
          value={displaySettings[BRIGHTNESS_ACTION]}
        />
      </div>
      <ColumnedList items={colonOptions} />
      <div className={`${styles.displayScreenPosCenterFlex}`}>
        <div
          className={`${styles.displayScreenPosColFlex}`}
          id={SCREENPOS_ACTION + "-parent"}
        >
          <Button
            buttonText={`${strings.screenpos}`}
            buttonNumber={SCREENPOS}
            textColor="var(--pink)"
            id={SCREENPOS_ACTION}
            parentId={SCREENPOS_ACTION + "-parent"}
            actions={{ trigger: SCREENPOS_ACTION }}
            buttonGroup={buttonGroups.DISPLAY}
            cursorFactors={RADAR_CURSOR_FACTORS}
            additionalClassnames={[
              styles.displayPadleft,
              styles.displayPadright,
              styles.displayButtonHeight,
            ]}
          />
          <div
            className={`${styles.displayScreenPosImage} posImage`}
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayMenu;
