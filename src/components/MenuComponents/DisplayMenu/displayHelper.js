import { buttonIndices } from "../../../constants/buttonGroups";

const { TRAILS, SUBTITLES, WIDESCREEN, RADAR, HUD } = buttonIndices.DISPLAY;

export const displayHelperFunctions = () => {
    const updateElementsRects = (elementRects) => {
        const ret = elementRects.map((rect, index) => {
            const hoverableElement = document.getElementById(rect.id + "-start");
            const statusElement = document.getElementById(rect.id + "-status");
            if (hoverableElement && statusElement) {
              const hoverableRect = hoverableElement.getBoundingClientRect();
              const statusRect = statusElement.getBoundingClientRect();
              return {
                ...rect,
                hoverableElement: hoverableRect,
                statusElement: statusRect,
              };
            }
            return rect;
          });
        return ret;
    };

    const updateFakeElements = (fakeElements, updatedRects) => {
        const ret = fakeElements.map((element, index) => {
            const rect = updatedRects[index];
            if (rect && rect.hoverableElement && rect.statusElement) {
              const { hoverableElement, statusElement } = rect;
              const newStyle = {
                top: hoverableElement.top,
                left: hoverableElement.left,
                height: hoverableElement.height,
                width: statusElement.right - hoverableElement.left,
              };
              return { ...element, style: newStyle };
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