import styles from "./Button.module.css";
import { buttonGroups } from "../../constants/buttonGroups";
import Hoverable from "../Hoverable/Hoverable";

const Button = ({
  buttonText = "Sample",
  buttonNumber = 0,
  textColor = "var(--white)",
  buttonGroup = buttonGroups.MAIN,
  actions = {},
  cursorFactors = {
    clipFactor: undefined,
    topFactor: undefined,
    leftFactor: undefined,
    widthFactor: undefined,
    heightFactor: undefined,
  },
  id = "",
  parentId = "",
  activeCondition = () => {return true;},
  alwaysBigHover = false,
  overrideClassname,
  additionalClassnames = [],
}) => {
  const textStyle = {
    color: textColor,
  };

  return (
    <Hoverable
      buttonNumber={buttonNumber}
      buttonGroup={buttonGroup}
      actions={actions}
      cursorFactors={cursorFactors}
      topClassName={`${overrideClassname ? overrideClassname : "pricedown pricedownM"}`}
      topStyles={textStyle}
      activeCondition={activeCondition}
      id={id}
      parentId={parentId}
      alwaysBigHover={alwaysBigHover}
      additionalClassnames={additionalClassnames}
    >
      <span>{buttonText}</span>
    </Hoverable>
  );
};

export default Button;
