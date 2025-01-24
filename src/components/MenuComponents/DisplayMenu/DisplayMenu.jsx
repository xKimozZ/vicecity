import { useSelector } from "react-redux";
import { buttonGroups, buttonIndices } from "../../../constants/buttonGroups";
import Button from "../../Button/Button";
import styles from "./DisplayMenu.module.css";
import Bar from "../../Bar/Bar";
import { miscSelector } from "../../../store/miscSlice";
import { stringDisplaySelector } from "../../../store/localizationSlice";
import { actionNames } from "../../../constants/actionNames";
import Hoverable from "../../Hoverable/Hoverable";
import { navigationSelector } from "../../../store/navigationSlice";
import { useEffect, useState } from "react";
import { displayHelperFunctions } from "./displayHelper";

const { BRIGHTNESS, TRAILS, SUBTITLES, WIDESCREEN, RADAR, HUD, SCREENPOS, NUM_OPTIONS } = buttonIndices.DISPLAY;
const { BRIGHTNESS_ID, TRAILS_ID, SUBTITLES_ID, WIDESCREEN_ID, RADAR_ID, HUD_ID, SCREENPOS_ID,
    RADAR_MAPBLIPS, RADAR_BLIPSONLY, RADAR_OFF} = actionNames.DISPLAY;

const BRIGHTNESS_WRAPPER = "brightness-wrapper";

const {updateElementsRects, updateFakeElements, tempReturnIndex } = displayHelperFunctions();

const DisplayMenu = () => {
  const strings = useSelector(stringDisplaySelector);
  const {displaySettings} = useSelector(miscSelector);
  const {activeButtonGroup} = useSelector(navigationSelector)

  const [fakeElements, setFakeElements] = useState([
    { id: TRAILS_ID, style: {top:0,left:0,height:0,width:0} },
    { id: SUBTITLES_ID, style: {top:0,left:0,height:0,width:0} },
    { id: WIDESCREEN_ID, style: {top:0,left:0,height:0,width:0} },
    { id: RADAR_ID, style: {top:0,left:0,height:0,width:0} },
    { id: HUD_ID, style: {top:0,left:0,height:0,width:0} },
  ]);
  const [elementRects, setElementRects] = useState([
    { id: TRAILS_ID, hoverableElement: null, statusElement: null },
    { id: SUBTITLES_ID, hoverableElement: null, statusElement: null },
    { id: WIDESCREEN_ID, hoverableElement: null, statusElement: null },
    { id: RADAR_ID, hoverableElement: null, statusElement: null },
    { id: HUD_ID, hoverableElement: null, statusElement: null },
  ]);

  useEffect(() => {
    const updatePosition = () => {
      const updatedRects = updateElementsRects(elementRects);
      setElementRects(updatedRects);
      const updatedFakeElements = updateFakeElements(fakeElements, updatedRects);
      setFakeElements(updatedFakeElements);
    };

    updatePosition(); // Initial call
    window.addEventListener("resize", updatePosition); // Update on resize

    return () => {
      window.removeEventListener("resize", updatePosition); // Clean up
    };
  }, [activeButtonGroup]);

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
  
  const renderOption = (key, buttonNumber, id, ) => {
    const wrapper = (content) => (
      <Hoverable
        buttonNumber={buttonNumber}
        actions={{ trigger: id }}
        buttonGroup={buttonGroups.DISPLAY}
        id={id}
        parentId={id + "-parent"}
        alwaysBigHover={true}
        topClassName={`${styles.displayText}`}
        columnParams={{ statusId: id + "-status", isColumn: true }}
      >
        {content}
      </Hoverable>
    );

  const optionText = () => <div className={`${styles.displayOptionButton}`}><span id={id+"-start"} className={`${styles.displayPadleft} `}>{`${strings[key]}`}</span></div>
  const columnText = () => <div id={id+"-column"} className={`${styles.displayDots} ${styles.displayOptionColumn}`}>:</div>
  const statusText = () => <div className={`${styles.displayOptionStatus}`}><span id={id+"-status"} className={`${styles.displayPadright}  `}>{Status(id)}</span></div>
  
  const ind = tempReturnIndex(buttonNumber);
  return (
    <>
    <div id={id+"-parent"} style={{position:"fixed", ...fakeElements[ind].style}}/>
      {wrapper(optionText())}
      {wrapper(columnText())}
      {wrapper(statusText())}
  </>)
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
      <div className={` ${styles.displayOptionGrid}`}>
          {renderOption("trails", TRAILS, TRAILS_ID)}
          {renderOption("subtitles", SUBTITLES, SUBTITLES_ID)}
          {renderOption("widescreen", WIDESCREEN, WIDESCREEN_ID)}
          {renderOption("radar", RADAR, RADAR_ID)}
          {renderOption("hud", HUD, HUD_ID)}
          <div  id="screenpos">
        <Button
          buttonText={`${strings.screenpos}`}
          buttonNumber={SCREENPOS}
          textColor="var(--pink)"
          buttonGroup={buttonGroups.DISPLAY}
        />
      </div>
      </div>
    </div>
  );
};

export default DisplayMenu;
