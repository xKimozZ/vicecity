
export const displayHelperFunctions = () => {
    const updateElementsRects = (elementRects) => {
        const ret = elementRects.map(( rect ) => {
            const hoverableElement = document.getElementById(rect.id + "-start");
            const statusElement = document.getElementById(rect.id + "-status");
            const columnElement = document.getElementById(rect.id + "-column");
            if (hoverableElement && statusElement && columnElement) {
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

    const updateFakeElements = (fakeElements, updatedRects, screenPosStruct = {x:0,y:0}) => {
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
    
  return { updateElementsRects, updateFakeElements };
};