import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import styles from "./DisplayMenu.module.css";
import Button from "../../Button/Button";
import Bar from "../../Bar/Bar";
import ColumnedList from "../../ColumnedList/ColumnedList";
import { imageImports } from "../../../assets/imageImports";
import { buttonGroups, buttonIndices } from "../../../constants/buttonGroups";
import { actionNames } from "../../../constants/actionNames";

const { BRIGHTNESS, TRAILS, SUBTITLES, WIDESCREEN, RADAR, HUD, SCREENPOS } = buttonIndices.DISPLAY;
const { BRIGHTNESS_ID, TRAILS_ID, SUBTITLES_ID, WIDESCREEN_ID, RADAR_ID, HUD_ID, SCREENPOS_ID, RADAR_MAPBLIPS, RADAR_BLIPSONLY, RADAR_OFF } = actionNames.DISPLAY;
const BRIGHTNESS_WRAPPER = "brightness-wrapper";
const RADAR_CURSOR_FACTORS = {
  clipFactor: 4,
  topFactor: 1,
  leftFactor: 1.1,
  widthFactor: 1.01,
  heightFactor: 1.18,
};

const DisplayMenu = () => {
  const { selectorAbstractor } = useReduxAbstractorContext();
  const { displaySettings } = selectorAbstractor.miscState;
  const strings = selectorAbstractor.localizationState.stringDisplayState;

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
    { stringKey: "trails", buttonNumber: TRAILS, buttonGroup: buttonGroups.DISPLAY, id: TRAILS_ID, isTwoStaged: false, dependencies: displaySettings[TRAILS_ID], getStatusString: Status, getOptionTextString: (key) => strings[key] },
    { stringKey: "subtitles", buttonNumber: SUBTITLES, buttonGroup: buttonGroups.DISPLAY, id: SUBTITLES_ID, isTwoStaged: false, dependencies: displaySettings[SUBTITLES_ID], getStatusString: Status, getOptionTextString: (key) => strings[key] },
    { stringKey: "widescreen", buttonNumber: WIDESCREEN, buttonGroup: buttonGroups.DISPLAY, id: WIDESCREEN_ID, isTwoStaged: false, dependencies: displaySettings[WIDESCREEN_ID], getStatusString: Status, getOptionTextString: (key) => strings[key] },
    { stringKey: "radar", buttonNumber: RADAR, buttonGroup: buttonGroups.DISPLAY, id: RADAR_ID, isTwoStaged: true, dependencies: displaySettings[RADAR_ID], getStatusString: Status, getOptionTextString: (key) => strings[key], cursorFactors: RADAR_CURSOR_FACTORS },
    { stringKey: "hud", buttonNumber: HUD, buttonGroup: buttonGroups.DISPLAY, id: HUD_ID, isTwoStaged: false, dependencies: displaySettings[HUD_ID], getStatusString: Status, getOptionTextString: (key) => strings[key] },
  ];

  return (
    <div className={styles.displayContainer}>
      <div className={styles.displayOptionFlex} id={BRIGHTNESS_WRAPPER}>
        <Button
          buttonText={strings.brightness}
          buttonNumber={BRIGHTNESS}
          textColor="var(--pink)"
          buttonGroup={buttonGroups.DISPLAY}
          actions={{ trigger: BRIGHTNESS_ID }}
          id={BRIGHTNESS_ID}
          parentId={BRIGHTNESS_WRAPPER}
        />
        <Bar filledBars={displaySettings[BRIGHTNESS_ID]} />
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
            additionalClassnames={[ styles.displayPadleft, styles.displayPadright, ]}
          />
          <img src={imageImports.miscImages.scsize} className={styles.displayScreenPosImage} />
        </div>
      </div>
    </div>
  );
};

export default DisplayMenu;
