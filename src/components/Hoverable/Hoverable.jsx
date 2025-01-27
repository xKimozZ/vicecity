import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { navigationSelector } from "../../store/navigationSlice";
import { buttonGroups } from "../../constants/buttonGroups";
import { useEventHandlerContext } from "../../context/EventHandlerContext";
import useDispatchAbstractor from "../../hooks/useDispatchAbstractor";

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
  columnParams = {twoStaged: false},
  additionalClassnames = [],
}) => {
  const buttonRef = useRef(null);
  const { navigationFunctions } = useDispatchAbstractor();
  const { hoveredOption, activeButtonGroup, bigHover } = useSelector(navigationSelector);
  const { handleHover: hoverFunction, handleSelect: selectFunction, globalHookFunctions } = useEventHandlerContext();

  const isHovered = hoveredOption === buttonNumber;
  const isActive = activeButtonGroup === buttonGroup && activeCondition();
  const hasParent = () => {
    const parent2suffix = columnParams.twoStaged && !bigHover.active ? "2" : ""; 
    return document.getElementById(parentId + parent2suffix);
  };

  useEffect(() => {
    const updatePosition = () => {
      // This is entered only if the global hovered option successfully picks me
      if (isHovered && isActive && buttonRef.current) {
        const elementToHighlight = alwaysBigHover && hasParent() ? hasParent() : buttonRef.current;

        globalHookFunctions.rerenderCursor(elementToHighlight, cursorFactors);
        navigationFunctions.setCurrentActions(actions);

        const newBigHover = {myId: id, parentId: parentId, active: false, always: alwaysBigHover, twoStaged: columnParams.twoStaged};
        navigationFunctions.setBigHover(newBigHover);
      }
    };

    updatePosition(); // Initial call
    window.addEventListener("resize", updatePosition); // Update on resize

    return () => {
      window.removeEventListener("resize", updatePosition); // Clean up
    };
  }, [hoveredOption, activeButtonGroup]);

  const handleHover = () => {
    if (isHovered || !isActive) return;
    hoverFunction?.(buttonNumber);
  };

  const handleSelect = () => {
    if (!isActive) return;
    selectFunction?.(buttonNumber);
  };

  const classNames = [topClassName, ...additionalClassnames].join(" ");
  return (
    <div
      id={id}
      onMouseEnter={handleHover}
      onClick={handleSelect}
      ref={buttonRef}
      className={classNames}
      style={{ ...topStyles }}
    >
      {children}
    </div>
  );
};

export default Hoverable;
