import { useSelector } from "react-redux";
import styles from "./SaveGame.module.css";
import { useEffect, useState } from "react";
import Hoverable from "../../Hoverable/Hoverable";
import { buttonGroups } from "../../../constants/buttonGroups";
import { stringLoadSelector } from "../../../store/localizationSlice";
import { navigationSelector } from "../../../store/navigationSlice";

const SaveGame = ({
  buttonNumber = 3,
  slotNumber = 0,
  buttonGroup = buttonGroups.LOAD,
  saveFile,
}) => {
  const {hoveredOption} = useSelector(navigationSelector);
  const strings = useSelector(stringLoadSelector);
  const [saveText, setSaveText] = useState(
    `${strings.savefile} ${slotNumber} ${strings.notpresent}`
  );
  const [actions, setActions] = useState({ fileExists: false });
  const cursorFactors = {
    clipFactor: 3,
    topFactor: 0.99,
    leftFactor: 0.99,
    widthFactor: 1,
    heightFactor: 1.1,
  };

  useEffect(() => {
    if (saveFile) {
      setSaveText(`${slotNumber}: ${saveFile.name}`);
      setActions({ fileExists: true });
    }
  }, []);

  const generateDate = (date) => {
    const dateString =
      (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
      " " +
      getMonthString(date.getMonth()) +
      " " +
      date.getFullYear() +
      " " +
      date.toISOString().slice(11, 19);
    return dateString;
  };

  const getMonthString = (month) => {
    switch (month) {
      case 0:
        return strings.jan;
      case 1:
        return strings.feb;
      case 2:
        return strings.mar;
      case 3:
        return strings.apr;
      case 4:
        return strings.may;
      case 5:
        return strings.jun;
      case 6:
        return strings.jul;
      case 7:
        return strings.aug;
      case 8:
        return strings.sep;
      case 9:
        return strings.oct;
      case 10:
        return strings.nov;
      case 11:
        return strings.dec;
      default:
        return null;
    }
  };

  const isChoosingSaveGames = () => {
    return hoveredOption >= 3;
  };

  return (
    <Hoverable
      buttonNumber={buttonNumber}
      buttonGroup={buttonGroup}
      actions={actions}
      cursorFactors={cursorFactors}
      topClassName={`${styles.saveButton}`}
      activeCondition={isChoosingSaveGames}
    >
      {saveText}
      {saveFile && (
        <span className={styles.saveDate}>{generateDate(saveFile.date)}</span>
      )}
    </Hoverable>
  );
};

export default SaveGame;
