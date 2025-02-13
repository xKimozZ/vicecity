import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import { useEventHandlerContext } from "../../../context/EventHandlerContext";
import { useEffect, useState } from "react";
import styles from "./DisplayMenu.module.css";
import Button from "../../Button/Button";
import Bar from "../../Bar/Bar";
import ColumnedList from "../../ColumnedList/ColumnedList";
import { imageImports } from "../../../assets/imageImports";
import { buttonGroups, buttonIndices } from "../../../constants/buttonGroups";
import { actionNames } from "../../../constants/actionNames";

const { BRIGHTNESS, TRAILS, SUBTITLES, WIDESCREEN, RADAR, HUD, SCREENPOS } = buttonIndices.DISPLAY;
const { BRIGHTNESS_ID, TRAILS_ID, SUBTITLES_ID, WIDESCREEN_ID, RADAR_ID, HUD_ID, SCREENPOS_ID, RADAR_MAPBLIPS, RADAR_BLIPSONLY, RADAR_OFF } = actionNames.DISPLAY;
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

const SCREENPOS_CURSOR_FACTORS = {
  clipFactor: 7,
  topFactor: 1,
  maxTopFactor: 1,
  leftFactor: 1.02,
  maxLeftFactor: 1.03,
  widthFactor: 0.95,
  minWidthFactor: 0.97,
  minHeightFactor: 1,
  heightFactor: 1.005,
};

const BRIGHTNESS_CURSOR_FACTORS = {
  clipFactor: 4,
  topFactor: 0.99,
  maxTopFactor: 1,
  leftFactor: 0.98,
  maxLeftFactor: 1,
  widthFactor: 1.05,
  minWidthFactor: 1.04,
  minHeightFactor: 1.07,
  heightFactor: 1.12,
};

const DisplayMenu = () => {
  const { selectorAbstractor } = useReduxAbstractorContext();
  const { displaySettings } = selectorAbstractor.miscState;
  const { bigHover, currentActions } = selectorAbstractor.navigationState;
  const strings = selectorAbstractor.localizationState.stringDisplayState;

  const { handleHover } = useEventHandlerContext();

  const Status = (key) => {
    if (key === RADAR_ID) {
      switch (displaySettings[RADAR_ID]) {
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
    { stringKey: "trails", buttonNumber: TRAILS, buttonGroup: buttonGroups.DISPLAY, id: TRAILS_ID, isTwoStaged: false, dependencies: displaySettings[TRAILS_ID], getStatusString: Status, getOptionTextString: (key) => strings[key], cursorFactors: RADAR_CURSOR_FACTORS },
    { stringKey: "subtitles", buttonNumber: SUBTITLES, buttonGroup: buttonGroups.DISPLAY, id: SUBTITLES_ID, isTwoStaged: false, dependencies: displaySettings[SUBTITLES_ID], getStatusString: Status, getOptionTextString: (key) => strings[key], cursorFactors: RADAR_CURSOR_FACTORS },
    { stringKey: "widescreen", buttonNumber: WIDESCREEN, buttonGroup: buttonGroups.DISPLAY, id: WIDESCREEN_ID, isTwoStaged: false, dependencies: displaySettings[WIDESCREEN_ID], getStatusString: Status, getOptionTextString: (key) => strings[key], cursorFactors: RADAR_CURSOR_FACTORS },
    { stringKey: "radar", buttonNumber: RADAR, buttonGroup: buttonGroups.DISPLAY, id: RADAR_ID, isTwoStaged: true, dependencies: displaySettings[RADAR_ID], getStatusString: Status, getOptionTextString: (key) => strings[key], cursorFactors: RADAR_CURSOR_FACTORS },
    { stringKey: "hud", buttonNumber: HUD, buttonGroup: buttonGroups.DISPLAY, id: HUD_ID, isTwoStaged: false, dependencies: displaySettings[HUD_ID], getStatusString: Status, getOptionTextString: (key) => strings[key], cursorFactors: RADAR_CURSOR_FACTORS },
  ];

  const isChangingScreenPos = bigHover.active && currentActions.trigger === SCREENPOS_ID;

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
      // window.addEventListener("touchmove", changePosWithWheel);
    }
    
    return () => {
      window.removeEventListener("wheel", changePosWithWheel);
      // window.removeEventListener("touchmove", changePosWithWheel);
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
          actions={{ trigger: BRIGHTNESS_ID }}
          id={BRIGHTNESS_ID}
          parentId={BRIGHTNESS_WRAPPER}
          cursorFactors={BRIGHTNESS_CURSOR_FACTORS}
          additionalClassnames={[styles.displayButtonHeight]}
          />
        <Bar
          buttonNumber={BRIGHTNESS}
          buttonGroup={buttonGroups.DISPLAY}
          actions={{ trigger: BRIGHTNESS_ID }}
          id={BRIGHTNESS_ID}
          parentId={BRIGHTNESS_WRAPPER}
          value={displaySettings[BRIGHTNESS_ID]}
          cursorFactors={BRIGHTNESS_CURSOR_FACTORS}
        />
      </div>
      <ColumnedList items={colonOptions} />
      <div className={`${styles.displayScreenPosCenterFlex}`}>
        <div
          className={`${styles.displayScreenPosColFlex}`}
          id={SCREENPOS_ID + "-parent"}
        >
          <Button
            buttonText={`${strings.screenpos}`}
            buttonNumber={SCREENPOS}
            textColor="var(--pink)"
            id={SCREENPOS_ID}
            parentId={SCREENPOS_ID + "-parent"}
            actions={{ trigger: SCREENPOS_ID }}
            buttonGroup={buttonGroups.DISPLAY}
            cursorFactors={SCREENPOS_CURSOR_FACTORS}
            additionalClassnames={[
              styles.displayPadleft,
              styles.displayPadright,
              styles.displayButtonHeight,
            ]}
          />
          <img src={imageImports.miscImages.scsize}
            className={`${styles.displayScreenPosImage} posImage`}
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayMenu;
