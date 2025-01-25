import { buttonIndices } from "../../../constants/buttonGroups";

const { TRAILS, SUBTITLES, WIDESCREEN, RADAR, HUD } = buttonIndices.DISPLAY;

export const displayHelperFunctions = () => {
    const updateElementsRects = (elementRects) => {
        const ret = elementRects.map((rect, index) => {
            const hoverableElement = document.getElementById(rect.id + "-start");
            const statusElement = document.getElementById(rect.id + "-status");
            const columnElement = document.getElementById(rect.id + "-column");
            if (hoverableElement && statusElement) {
              const hoverableRect = hoverableElement.getBoundingClientRect();
              const statusRect = statusElement.getBoundingClientRect();
              const columnRect = columnElement.getBoundingClientRect();
              return {
                ...rect,
                hoverableElement: hoverableRect,
                statusElement: statusRect,
                columnElement: columnRect,
              };
            }
            return rect;
          });
        return ret;
    };

    const updateFakeElements = (fakeElements, updatedRects, screenPosStruct) => {
        const {x, y} = screenPosStruct; // Necessary in order to synchronize and not "overdo" the calculation
        const ret = fakeElements.map((element, index) => {
            const rect = updatedRects[index];
            if (rect && rect.hoverableElement && rect.statusElement) {
              const { hoverableElement, statusElement, columnElement } = rect;
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
              return { ...element, style: newStyle, style2: newStyle2 };
            }
            return element;
          });
        return ret;
    };

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
    
  return {updateElementsRects, updateFakeElements, tempReturnIndex};
};