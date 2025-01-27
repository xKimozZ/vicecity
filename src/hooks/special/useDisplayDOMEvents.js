import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { miscSelector } from "../../store/miscSlice";
import { navigationSelector } from "../../store/navigationSlice";
import { actionNames } from "../../constants/actionNames";
import { displayHelperFunctions } from "./displayHelper";

const DEFAULT_STYLE = { top: 0, left: 0, height: 0, width: 0 };
const { BRIGHTNESS_ID, TRAILS_ID, SUBTITLES_ID, WIDESCREEN_ID, RADAR_ID, HUD_ID, SCREENPOS_ID } = actionNames.DISPLAY;

const initialFakeElements = [TRAILS_ID, SUBTITLES_ID, WIDESCREEN_ID, RADAR_ID, HUD_ID].map(id => ({
    id,
    style: { ...DEFAULT_STYLE },
    style2: { ...DEFAULT_STYLE }
}));

const initialElementRects = [TRAILS_ID, SUBTITLES_ID, WIDESCREEN_ID, RADAR_ID, HUD_ID].map(id => ({
    id,
    hoverableElement: null,
    statusElement: null,
    columnElement: null
}));

const { updateElementsRects, updateFakeElements } = displayHelperFunctions();

const useDisplayDOMEvents = (globalHookFunctions) => {
  const { displaySettings } = useSelector(miscSelector);
  const { activeButtonGroup, bigHover } = useSelector(navigationSelector);
  const { rerenderCursor } = globalHookFunctions;
  const [fakeElements, setFakeElements] = useState(initialFakeElements);
  const [elementRects, setElementRects] = useState(initialElementRects);
  const [lastRadar, setLastRadar] = useState(displaySettings[RADAR_ID]);

  useEffect(() => {
    const updatePosition = () => {
      const updatedRects = updateElementsRects(elementRects);
      setElementRects(updatedRects);
      const updatedFakeElements = updateFakeElements(fakeElements,updatedRects,displaySettings[SCREENPOS_ID]);
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
      const updatedFakeElements = updateFakeElements(fakeElements,updatedRects);
      setFakeElements(updatedFakeElements);
    }
    if (bigHover.active && bigHover.myId === BRIGHTNESS_ID) {
      const rootElement = document.getElementById("root");
      rootElement.style.filter = `brightness(${
        displaySettings[BRIGHTNESS_ID] + 0.08
      })`;
    }
  }, [displaySettings]);

  useEffect(() => {
    if (bigHover.active && bigHover.myId === RADAR_ID) {
      const cursorFactors = {
        clipFactor: 4,
        topFactor: 1,
        leftFactor: 1.1,
        widthFactor: 1.01,
        heightFactor: 1.18,
      };
      rerenderCursor(RADAR_ID + "-parent", cursorFactors);
    }
  }, [lastRadar]);

  return { fakeElements };
};

export default useDisplayDOMEvents;
