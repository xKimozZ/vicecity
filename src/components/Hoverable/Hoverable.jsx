import { useReduxAbstractorContext } from "../../context/ReduxAbstractorContext";
import { useEffect, useRef, useCallback } from "react";
import { buttonGroups } from "../../constants/buttonGroups";
import { useEventHandlerContext } from "../../context/EventHandlerContext";

const Hoverable = ({
  buttonNumber = 0,
  buttonGroup = buttonGroups.MAIN,
  actions = {},
  cursorFactors = {},
  id = "button-default-id",
  parentId = "my-parent-id",
  topClassName = "",
  topStyles = {},
  children,
  activeCondition = () => {return true;},
  alwaysBigHover = false,
  renderById = false,
  columnParams = {twoStaged: false},
  additionalClassnames = [],
}) => {
  const { selectorAbstractor, dispatchAbstractor } = useReduxAbstractorContext();
  const { navigationFunctions } = dispatchAbstractor;
  const { hoveredOption, activeButtonGroup, bigHover } = selectorAbstractor.navigationState;
  
  const buttonRef = useRef(null);
  const { handleHover: hoverFunction, handleSelect: selectFunction, globalHookFunctions } = useEventHandlerContext();

  const isHovered = hoveredOption === buttonNumber;
  const isActive = activeButtonGroup === buttonGroup && activeCondition();
  
  const getParent = useCallback(() => {
    const parent2suffix = columnParams.twoStaged && !bigHover.active ? "2" : "";
    return document.getElementById(parentId + parent2suffix);
  }, [parentId, columnParams.twoStaged, bigHover.active]);

  const updatePosition = useCallback(() => {
    if (isHovered && isActive && buttonRef.current) {
      const alwaysParent = alwaysBigHover && getParent();
      const wasInBigHover = bigHover.active && bigHover.myId === id;
      const selfElement = renderById ? document.getElementById(id) : buttonRef.current;

      const elementToHighlight = alwaysParent || wasInBigHover ? getParent() : selfElement;

      globalHookFunctions.rerenderCursor(elementToHighlight, cursorFactors);
      navigationFunctions.setCurrentActions(actions);

      navigationFunctions.setBigHover({
        myId: id,
        parentId: parentId,
        active: bigHover.active,
        always: alwaysBigHover,
        twoStaged: columnParams.twoStaged,
      });
    }
  }, [isHovered, isActive, bigHover, cursorFactors, actions, parentId, columnParams.twoStaged, alwaysBigHover, renderById, id]); // Add all dependencies

  useEffect(() => {

    if (isHovered) {
      updatePosition(); // Initial call
      window.addEventListener("resize", updatePosition); // Update on resize
    }

    return () => {
      window.removeEventListener("resize", updatePosition); // Clean up
    };
  }, [hoveredOption, activeButtonGroup, bigHover.active]);

  const handleHover = () => {
    hoverFunction(buttonNumber);
  };

  const handleSelect = () => {
    selectFunction(buttonNumber);
  };

  const hoverListenerEnabled = isActive && !bigHover.active && !isHovered;

  const classNames = [topClassName, ...additionalClassnames].join(" ");
  return (
    <div
      id={id}
      onMouseEnter={ hoverListenerEnabled ? handleHover : undefined }
      onClick={ isActive ? handleSelect : undefined }
      ref={buttonRef}
      className={classNames}
      style={{ ...topStyles }}
    >
      {children}
    </div>
  );
};

export default Hoverable;
