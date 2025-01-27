import { useReduxAbstractorContext } from "../../context/ReduxAbstractorContext";
import { useEventHandlerContext } from "../../context/EventHandlerContext";
import { useEffect, useState } from "react";
import Hoverable from "../Hoverable/Hoverable";
import { actionNames } from "../../constants/actionNames";
import styles from "./ColumnedItem.module.css";

const {  SCREENPOS_ID } = actionNames.DISPLAY;

const DEFAULT_STYLE = { top: 0, left: 0, height: 0, width: 0 };
const initialFakeStyles = {
    style: { ...DEFAULT_STYLE },
    style2: { ...DEFAULT_STYLE },
};

const ColumnedItem = ({ stringKey, buttonNumber, buttonGroup, id, isTwoStaged, cursorFactors, getStatusString, getOptionTextString, dependencies }) => {
    const { selectorAbstractor } = useReduxAbstractorContext();
    const { activeButtonGroup } = selectorAbstractor.navigationState;
    const { displaySettings } = selectorAbstractor.miscState;
    const { globalHookFunctions } = useEventHandlerContext();

    const [ fakeStyles, setFakeStyles ] = useState(initialFakeStyles);
    const [ shouldRerenderCursor, setShouldRerenderCursor ] = useState(false);

    const getUpdatedRects = () => {
      const hoverableElement = document.getElementById(id + "-start");
      const statusElement = document.getElementById(id + "-status");
      const columnElement = document.getElementById(id + "-column");
      if (hoverableElement && statusElement && columnElement) {
        const hoverableRect = hoverableElement.getBoundingClientRect();
        const statusRect = statusElement.getBoundingClientRect();
        const columnRect = columnElement.getBoundingClientRect();
        return {
          hoverableElement: hoverableRect,
          statusElement: statusRect,
          columnElement: columnRect,
        };
      } else
        return {
          hoverableElement: null,
          statusElement: null,
          columnElement: null,
        };
    };

    const getUpdatedFakeElements = ( updatedRects ) => {
        const {x, y} = displaySettings[SCREENPOS_ID]; // Necessary in order to synchronize and not "overdo" the calculation
            if (updatedRects && updatedRects.hoverableElement && updatedRects.columnElement && updatedRects.statusElement) {
              const { hoverableElement, statusElement, columnElement } = updatedRects;
              const newStyle = {
                top: hoverableElement.top - y,
                left: hoverableElement.left - x,
                height: hoverableElement.height,
                width: statusElement.right - hoverableElement.left,
              };
              const newStyle2 = {
                top: hoverableElement.top -y,
                left: hoverableElement.left -x,
                height: hoverableElement.height,
                width: columnElement.right * 1.02 - hoverableElement.left,
              };
              return { style: newStyle, style2: newStyle2 };
            }
            return { style: { ...DEFAULT_STYLE }, style2: { ...DEFAULT_STYLE } };
    };


    useEffect(() => {
        const updatePosition = () => {
          const updatedRects = getUpdatedRects();
          const updatedFakeStyle = getUpdatedFakeElements(updatedRects);
          setFakeStyles(updatedFakeStyle);
        };
    
        updatePosition(); // Initial call
        window.addEventListener("resize", updatePosition); // Update on resize
    
        return () => {
          window.removeEventListener("resize", updatePosition); // Clean up
        };
      }, [activeButtonGroup, displaySettings[SCREENPOS_ID], dependencies]);

    useEffect(() => {
        setShouldRerenderCursor(true);
    },
    [dependencies]);
    
    useEffect(() => {
        if (shouldRerenderCursor && activeButtonGroup === buttonGroup) {
            globalHookFunctions.rerenderCursor(id+"-parent", cursorFactors);
            setShouldRerenderCursor(false);
        }
    },
    [dependencies, shouldRerenderCursor]);

    const hoverableWrapper = (content) => (
        <Hoverable
            buttonNumber={buttonNumber}
            actions={{ trigger: id }}
            buttonGroup={buttonGroup}
            id={id}
            parentId={id + "-parent"}
            alwaysBigHover={true}
            topClassName={`${styles.theText}`}
            columnParams={{ twoStaged: isTwoStaged }}
            cursorFactors={cursorFactors}
        >
            {content}
        </Hoverable>
    );

    const optionText = () => (
      <div className={`${styles.optionText}`}>
        <span
          id={id + "-start"}
          className={`${styles.padLeft} `}
        >{`${getOptionTextString(stringKey)}`}</span>
      </div>
    );

    const columnText = () => (
      <div
        id={id + "-column"}
        className={`${styles.columnMargin} ${styles.columnText}`}
      >
        :
      </div>
    );

    const statusText = () => (
        <div className={`${styles.statusText}`}>
            <span id={id + "-status"} className={`${styles.padRight}  `}>
            {getStatusString(id)}
            </span>
        </div>
        );

    return (
        <>
            <div id={id + "-parent"} style={{position:"fixed",...fakeStyles.style}} />
            <div id={id + "-parent2"} style={{position:"fixed",...fakeStyles.style2}} />
            {hoverableWrapper(optionText())}
            {hoverableWrapper(columnText())}
            {hoverableWrapper(statusText())}
        </>
    )
};

export default ColumnedItem;