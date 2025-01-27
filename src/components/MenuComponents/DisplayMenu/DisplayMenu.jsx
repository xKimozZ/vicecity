import { useSelector } from "react-redux";
import { miscSelector } from "../../../store/miscSlice";
import { stringDisplaySelector } from "../../../store/localizationSlice";
import { useEventHandlerContext } from "../../../context/EventHandlerContext";
import useDisplayDOMEvents from "../../../hooks/special/useDisplayDOMEvents";
import { actionNames } from "../../../constants/actionNames";
import { buttonGroups, buttonIndices } from "../../../constants/buttonGroups";
import { imageImports } from "../../../assets/imageImports";
import styles from "./DisplayMenu.module.css";
import Button from "../../Button/Button";
import Hoverable from "../../Hoverable/Hoverable";
import Bar from "../../Bar/Bar";

const { BRIGHTNESS, TRAILS, SUBTITLES, WIDESCREEN, RADAR, HUD, SCREENPOS } = buttonIndices.DISPLAY;
const { BRIGHTNESS_ID, TRAILS_ID, SUBTITLES_ID, WIDESCREEN_ID, RADAR_ID, HUD_ID, SCREENPOS_ID, RADAR_MAPBLIPS, RADAR_BLIPSONLY, RADAR_OFF } = actionNames.DISPLAY;
const BRIGHTNESS_WRAPPER = "brightness-wrapper";

const DisplayMenu = () => {
  const strings = useSelector(stringDisplaySelector);
  const { displaySettings } = useSelector(miscSelector);
  const { globalHookFunctions } = useEventHandlerContext();
  const { fakeElements } = useDisplayDOMEvents(globalHookFunctions);

  const tempReturnIndex = (num) => {
    switch (num) {
      case TRAILS:
        return 0;
      case SUBTITLES:
        return 1;
      case WIDESCREEN:
        return 2;
      case RADAR:
        return 3;
      case HUD:
        return 4;
      default:
        return -1;
    }
  };

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

  const renderOption = (key, buttonNumber, id) => {
    const wrapper = (content) => (
      <Hoverable
        buttonNumber={buttonNumber}
        actions={{ trigger: id }}
        buttonGroup={buttonGroups.DISPLAY}
        id={id}
        parentId={id + "-parent"}
        alwaysBigHover={true}
        topClassName={`${styles.displayText}`}
        columnParams={{ twoStaged: id === RADAR_ID ? true : false }}
      >
        {content}
      </Hoverable>
    );

    const optionText = () => (
      <div className={`${styles.displayOptionButton}`}>
        <span
          id={id + "-start"}
          className={`${styles.displayPadleft} `}
        >{`${strings[key]}`}</span>
      </div>
    );
    const columnText = () => (
      <div
        id={id + "-column"}
        className={`${styles.displayDots} ${styles.displayOptionColumn}`}
      >
        :
      </div>
    );
    const statusText = () => (
      <div className={`${styles.displayOptionStatus}`}>
        <span id={id + "-status"} className={`${styles.displayPadright}  `}>
          {Status(id)}
        </span>
      </div>
    );

    const ind = tempReturnIndex(buttonNumber);
    return (
      <>
        <div id={id + "-parent"} style={{ position: "fixed", ...fakeElements[ind].style }} />
        <div id={id + "-parent2"} style={{ position: "fixed", ...fakeElements[ind].style2 }} />
        {wrapper(optionText())}
        {wrapper(columnText())}
        {wrapper(statusText())}
      </>
    );
  };

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
      <div className={` ${styles.displayOptionGrid}`}>
        {renderOption("trails", TRAILS, TRAILS_ID)}
        {renderOption("subtitles", SUBTITLES, SUBTITLES_ID)}
        {renderOption("widescreen", WIDESCREEN, WIDESCREEN_ID)}
        {renderOption("radar", RADAR, RADAR_ID)}
        {renderOption("hud", HUD, HUD_ID)}
      </div>
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
