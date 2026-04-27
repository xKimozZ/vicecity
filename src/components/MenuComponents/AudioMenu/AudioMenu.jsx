import styles from "./AudioMenu.module.css";
import Button from "../../Button/Button";
import Bar from "../../Bar/Bar";
import { buttonGroups, buttonIndices } from "../../../constants/buttonGroups";
import { actionNames } from "../../../constants/actionNames";
import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import Hoverable from "../../Hoverable/Hoverable";

const { SFX, MUSIC, RADIO, OUTPUT } = buttonIndices.AUDIO;
const { SFX_ID, MUSIC_ID, RADIO_ID, OUTPUT_ID } = actionNames.AUDIO;

const BAR_CURSOR_FACTORS = {
  clipFactor: 4,
  topFactor: 0.99,
  maxTopFactor: 1,
  leftFactor: 1,
  maxLeftFactor: 1,
  widthFactor: 1.05,
  minWidthFactor: 1.04,
  minHeightFactor: 1.07,
  heightFactor: 1.12,
};

const RADIO_CURSOR_FACTORS = {
  clipFactor: 7,
  topFactor: 1,
  leftFactor: 0.99,
  maxLeftFactor: 1.01,
  widthFactor: 1.01,
  minHeightFactor: 1.06,
  heightFactor: 1.08,
};

const OUTPUT_CURSOR_FACTORS = {
  clipFactor: 7,
  topFactor: 1,
  leftFactor: 0.99,
  maxLeftFactor: 1.02,
  widthFactor: 1.01,
  minHeightFactor: 1.06,
  heightFactor: 1.09,
};

const MUSIC_WRAPPER = "music-wrapper";
const SFX_WRAPPER = "sfx-wrapper";
const RADIO_WRAPPER = "radio-wrapper";

const getRadioString = (setting) => {
  switch (setting) {
    case actionNames.AUDIO.RADIO_FLASH:
      return "flash";
    case actionNames.AUDIO.RADIO_KCHAT:
      return "kchat";
    case actionNames.AUDIO.RADIO_FEVER:
      return "fever";
    case actionNames.AUDIO.RADIO_VROCK:
      return "vrock";
    case actionNames.AUDIO.RADIO_VCPR:
      return "vcpr";
    case actionNames.AUDIO.RADIO_ESPANTOSO:
      return "espantoso";
    case actionNames.AUDIO.RADIO_EMOTION:
      return "emotion";
    case actionNames.AUDIO.RADIO_WAVE:
      return "wave";
    case actionNames.AUDIO.RADIO_WILDSTYLE:
      return "wildstyle";
    default:
      return "";
  }
};


const AudioMenu = () => {
  const { selectorAbstractor } = useReduxAbstractorContext();
  const { audioSettings } = selectorAbstractor.miscState;
  const { bigHover, currentActions } = selectorAbstractor.navigationState;  
  const strings = selectorAbstractor.localizationState.stringAudioState;

  return (
    <div className={`${styles.audioContainer}`}>
      <div className={styles.barsRow}>
        <div className={styles.barFlex} id={MUSIC_WRAPPER}>
          <Button
            buttonText={strings.music}
            buttonNumber={MUSIC}
            textColor="var(--pink)"
            buttonGroup={buttonGroups.AUDIO}
            actions={{ trigger: MUSIC_ID }}
            id={MUSIC_ID}
            parentId={MUSIC_WRAPPER}
            cursorFactors={BAR_CURSOR_FACTORS}
            additionalClassnames={[styles.alignRight]}
          />
          <Bar
            buttonNumber={MUSIC}
            buttonGroup={buttonGroups.AUDIO}
            actions={{ trigger: MUSIC_ID }}
            id={MUSIC_ID}
            parentId={MUSIC_WRAPPER}
            value={audioSettings[MUSIC_ID]}
            cursorFactors={BAR_CURSOR_FACTORS}
          />
        </div>

        <div className={styles.barFlex} id={SFX_WRAPPER}>
          <Button
            buttonText={strings.sfx}
            buttonNumber={SFX}
            textColor="var(--pink)"
            buttonGroup={buttonGroups.AUDIO}
            actions={{ trigger: SFX_ID }}
            id={SFX_ID}
            parentId={SFX_WRAPPER}
            cursorFactors={BAR_CURSOR_FACTORS}
            // additionalClassnames={[styles.alignRight]}
          />
          <Bar
            buttonNumber={SFX}
            buttonGroup={buttonGroups.AUDIO}
            actions={{ trigger: SFX_ID }}
            id={SFX_ID}
            parentId={SFX_WRAPPER}
            value={audioSettings[SFX_ID]}
            cursorFactors={BAR_CURSOR_FACTORS}
          />
        </div>
      </div>
      <div className={styles.barsRow} style={{ gap: "10em" }}>
        <div>
          <div id={RADIO_WRAPPER}>
            <Button
              buttonText={strings.radio}
              buttonNumber={RADIO}
              textColor="var(--pink)"
              buttonGroup={buttonGroups.AUDIO}
              actions={{ trigger: RADIO_ID }}
              id={RADIO_ID}
              parentId={RADIO_WRAPPER}
              additionalClassnames={[styles.radioText]}
              cursorFactors={RADIO_CURSOR_FACTORS}
            />
            <Hoverable
              renderById={true}
              buttonNumber={RADIO}
              id={RADIO_ID}
              parentId={RADIO_WRAPPER}
              buttonGroup={buttonGroups.AUDIO}
              actions={{ trigger: RADIO_ID }}
              topClassName={"pricedown pricedownM"}
              topStyles={{ textAlign: "center" }}
              cursorFactors={RADIO_CURSOR_FACTORS}
            >
              {strings[getRadioString(audioSettings[RADIO_ID])]}
            </Hoverable>
          </div>
        </div>

        <Hoverable
          buttonNumber={OUTPUT}
          buttonGroup={buttonGroups.AUDIO}
          actions={{ trigger: OUTPUT_ID }}
          topClassName={"pricedown pricedownM"}
          topStyles={{ textAlign: "center" }}
          cursorFactors={OUTPUT_CURSOR_FACTORS}
          additionalClassnames={[styles.outputPadding]}
        >
          <div style={{ paddingLeft: "0.2em" }}>{strings.output}</div>
          <div>{audioSettings[OUTPUT_ID] ? strings.dts : strings.stereo}</div>
        </Hoverable>
      </div>
    </div>
  );
};

export default AudioMenu;
