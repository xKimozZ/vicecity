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
import {auxilaryFunctions} from "../../../utils/events/auxilaryFunctions"
import useDispatchAbstractor from "../../../hooks/useDispatchAbstractor";
import { imageImports } from "../../../assets/imageImports";

const { BRIGHTNESS, TRAILS, SUBTITLES, WIDESCREEN, RADAR, HUD, SCREENPOS, NUM_OPTIONS } = buttonIndices.DISPLAY;
const { BRIGHTNESS_ID, TRAILS_ID, SUBTITLES_ID, WIDESCREEN_ID, RADAR_ID, HUD_ID, SCREENPOS_ID,
  RADAR_MAPBLIPS, RADAR_BLIPSONLY, RADAR_OFF} = actionNames.DISPLAY;
  
  const BRIGHTNESS_WRAPPER = "brightness-wrapper";
  
  const {updateElementsRects, updateFakeElements, tempReturnIndex } = displayHelperFunctions();
  
  const DisplayMenu = () => {
    const strings = useSelector(stringDisplaySelector);
    const {displaySettings} = useSelector(miscSelector);
    const {activeButtonGroup, bigHover} = useSelector(navigationSelector)
    const {cursorFunctions} = useDispatchAbstractor();
    const {rerenderCursor} = auxilaryFunctions({cursorFunctions: cursorFunctions});
  
  const [fakeElements, setFakeElements] = useState([
    { id: TRAILS_ID, style: {top:0,left:0,height:0,width:0} , style2: {top:0,left:0,height:0,width:0} },
    { id: SUBTITLES_ID, style: {top:0,left:0,height:0,width:0} , style2: {top:0,left:0,height:0,width:0}},
    { id: WIDESCREEN_ID, style: {top:0,left:0,height:0,width:0} , style2: {top:0,left:0,height:0,width:0}},
    { id: RADAR_ID, style: {top:0,left:0,height:0,width:0} , style2: {top:0,left:0,height:0,width:0}},
    { id: HUD_ID, style: {top:0,left:0,height:0,width:0} , style2: {top:0,left:0,height:0,width:0}},
  ]);
  const [elementRects, setElementRects] = useState([
    { id: TRAILS_ID, hoverableElement: null, statusElement: null,  columnElement: null  },
    { id: SUBTITLES_ID, hoverableElement: null, statusElement: null,  columnElement: null   },
    { id: WIDESCREEN_ID, hoverableElement: null, statusElement: null,  columnElement: null   },
    { id: RADAR_ID, hoverableElement: null, statusElement: null,  columnElement: null   },
    { id: HUD_ID, hoverableElement: null, statusElement: null,  columnElement: null   },
  ]);
  const [lastRadar, setLastRadar] = useState(displaySettings[RADAR_ID]);
  
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
  }, [activeButtonGroup, displaySettings]);

  useEffect(() => {
    if (lastRadar !== displaySettings[RADAR_ID]) {
      setLastRadar(displaySettings[RADAR_ID]);
      const updatedRects = updateElementsRects(elementRects);
      setElementRects(updatedRects);
      const updatedFakeElements = updateFakeElements(fakeElements, updatedRects);
      setFakeElements(updatedFakeElements);
    }
  }, [displaySettings]);

  useEffect(() => {
    if (bigHover.active && bigHover.myId === RADAR_ID)
    {
      const cursorFactors = {
        clipFactor: 4,
        topFactor: 1,
        leftFactor: 1.1,
        widthFactor: 1.01,
        heightFactor: 1.18,
      };
      rerenderCursor(RADAR_ID+"-parent", cursorFactors);
    }
  }, [lastRadar]);

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
        columnParams={{ twoStaged: id === RADAR_ID ? true : false }}
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
    <div id={id+"-parent2"} style={{position:"fixed", ...fakeElements[ind].style2}}/>
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
      </div>
      <div className={`${styles.displayScreenPosCenterFlex}`}>
        <div className={`${styles.displayScreenPosColFlex}`} id={SCREENPOS_ID+"-parent"}>
          <Button
            buttonText={`${strings.screenpos}`}
            buttonNumber={SCREENPOS}
            textColor="var(--pink)"
            id={SCREENPOS_ID}
            parentId={SCREENPOS_ID+"-parent"}
            actions={{trigger: SCREENPOS_ID}}
            buttonGroup={buttonGroups.DISPLAY}
            additionalClassnames={[styles.displayPadleft , styles.displayPadright]}
          />
          <img src={imageImports.miscImages.scsize} className={styles.displayScreenPosImage}/>
        </div>
      </div>    
    </div>
  );
};

export default DisplayMenu;
