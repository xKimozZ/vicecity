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
  cursorFactors = {
    clipFactor: undefined,
    topFactor: undefined,
    leftFactor: undefined,
    widthFactor: undefined,
    heightFactor: undefined,
  },
  id = "button-default-id",
  parentId = "my-parent-id",
  topClassName = "",
  topStyles = {},
  children,
  activeCondition = () => {return true;},
  alwaysBigHover = false,
  columnParams = {twoStaged: false},
}) => {
  const buttonRef = useRef(null);
  const { cursorFunctions, navigationFunctions } = useDispatchAbstractor();
  const { hoveredOption, activeButtonGroup, bigHover } = useSelector(navigationSelector);
  const { handleHover: hoverFunction, handleSelect: selectFunction } =
    useEventHandlerContext();

  const isHovered = () => {
    return hoveredOption === buttonNumber;
  };

  const isActive = () => {
    return activeButtonGroup === buttonGroup && activeCondition();
  };

  const hasParent = () => {
    const parent2suffix = columnParams.twoStaged && !bigHover.active ? "2" : ""; 
    return document.getElementById(parentId + parent2suffix);
  };

  useEffect(() => {
    const updatePosition = () => {
      if (isHovered() && isActive() && buttonRef.current) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const rect = alwaysBigHover && hasParent()
          ? hasParent().getBoundingClientRect()
          : buttonRef.current.getBoundingClientRect();

        const rectInPercentages = {
          top: (rect.top / viewportHeight) * 100,
          left: (rect.left / viewportWidth) * 100,
          width: (rect.width / viewportWidth) * 100,
          height: (rect.height / viewportHeight) * 100,
          ...cursorFactors,
        };

        cursorFunctions.changeLocation(rectInPercentages);
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
    if (isHovered() || !isActive()) return;
    hoverFunction?.(buttonNumber);
  };

  const handleSelect = () => {
    if (!isActive()) return;
    selectFunction?.(buttonNumber);
  };

  return (
    <div
      id={id}
      onMouseEnter={handleHover}
      onClick={handleSelect}
      ref={buttonRef}
      className={topClassName}
      style={{ ...topStyles }}
    >
      {children}
    </div>
  );
};

export default Hoverable;
