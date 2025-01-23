import { useSelector } from "react-redux";
import { buttonGroups, buttonIndices } from "../../../constants/buttonGroups";
import Button from "../../Button/Button";
import styles from "./DisplayMenu.module.css";
import Bar from "../../Bar/Bar";
import { miscSelector } from "../../../store/miscSlice";
import { stringDisplaySelector } from "../../../store/localizationSlice";
import { actionNames } from "../../../constants/actionNames";

const { BRIGHTNESS, TRAILS, SUBTITLES, WIDESCREEN, RADAR, HUD, SCREENPOS, NUM_OPTIONS } = buttonIndices.DISPLAY;
const { BRIGHTNESS_ID, TRAILS_ID, SUBTITLES_ID, WIDESCREEN_ID, RADAR_ID, HUD_ID, SCREENNPOS_ID } = actionNames.DISPLAY;

const BRIGHTNESS_WRAPPER = "brightness-wrapper";

const DisplayMenu = () => {
  const strings = useSelector(stringDisplaySelector);
  const {displaySettings} = useSelector(miscSelector);

  const Status = (key) => {
    return displaySettings[key] ? strings.on : strings.off;
  };

  return (
    <div className={styles.displayContainer}>
      <div className={styles.displayOptionFlex} id={BRIGHTNESS_WRAPPER}>
        <Button
          buttonText={strings.brightness}
          buttonNumber={BRIGHTNESS}
          textColor="var(--pink)"
          buttonGroup={buttonGroups.DISPLAY}
          actions={{trigger: BRIGHTNESS_ID}}
          id={BRIGHTNESS_ID}
          parentId={BRIGHTNESS_WRAPPER}
        />
        <Bar filledBars={displaySettings[BRIGHTNESS_ID]}/>
      </div>
      <div className={styles.displayOptionFlex}>
        <Button
          buttonText={`${strings.trails} : ${Status("trails")}`}
          buttonNumber={TRAILS}
          textColor="var(--pink)"
          actions={{trigger: TRAILS_ID}}
          buttonGroup={buttonGroups.DISPLAY}
          id={TRAILS_ID}
        />
      </div>
      <div className={styles.displayOptionFlex}>
        <Button
          buttonText={`${strings.subtitles} : ${Status("subtitles")}`}
          buttonNumber={SUBTITLES}
          textColor="var(--pink)"
          actions={{trigger: SUBTITLES_ID}}
          buttonGroup={buttonGroups.DISPLAY}
          id={SUBTITLES_ID}
        />
      </div>
      <div className={styles.displayOptionFlex}>
        <Button
          buttonText={`${strings.widescreen} : ${Status("widescreen")}`}
          buttonNumber={WIDESCREEN}
          textColor="var(--pink)"
          buttonGroup={buttonGroups.DISPLAY}
          actions={{trigger: WIDESCREEN_ID}}
          alwaysBigHover={true}
          id={WIDESCREEN_ID}
          />
      </div>
      <div className={styles.displayOptionFlex} id="radar-wrapper">
        <Button
          buttonText={`${strings.radar}: ${Status("radar")}`}
          buttonNumber={RADAR}
          textColor="var(--pink)"
          buttonGroup={buttonGroups.DISPLAY}
          alwaysBigHover={true}
          parentId="test1"
          />
      </div>
      <div className={styles.displayOptionFlex} id="hud">
        <Button
          buttonText={`${strings.hud} : ${Status("hud")}`}
          buttonNumber={HUD}
          textColor="var(--pink)"
          buttonGroup={buttonGroups.DISPLAY}
          actions={{trigger: HUD_ID}}
          id={HUD_ID}
          />
      </div>
      <div className={styles.displayOptionFlex} id="screenpos">
        <Button
          buttonText={`${strings.screenpos}`}
          buttonNumber={SCREENPOS}
          textColor="var(--pink)"
          buttonGroup={buttonGroups.DISPLAY}
        />
      </div>
    </div>
  );
};

export default DisplayMenu;
