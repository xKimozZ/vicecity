import { useSelector } from "react-redux";
import { buttonGroups } from "../../../constants/buttonGroups";
import Button from "../../Button/Button";
import styles from "./DisplayMenu.module.css";
import Bar from "../../Bar/Bar";
import { miscSelector } from "../../../store/miscSlice";
import { stringDisplaySelector } from "../../../store/localizationSlice";

const DisplayMenu = () => {
  const strings = useSelector(stringDisplaySelector);
  const {displaySettings} = useSelector(miscSelector);

  const Status = (key) => {
    return displaySettings[key] ? strings.on : strings.off;
  };

  return (
    <div className={styles.displayContainer}>
      <div className={styles.displayOptionFlex} id="brightness">
        <Button
          buttonText={strings.brightness}
          buttonNumber={1}
          textColor="var(--pink)"
          buttonGroup={buttonGroups.DISPLAY}
          actions={{trigger: "brightness"}}
          id="brightness-button"
          parentId="brightness"
        />
        <Bar />
      </div>
      <div className={styles.displayOptionFlex} id="test">
        <Button
          buttonText={`${strings.trails} : ${Status("trails")}`}
          buttonNumber={2}
          textColor="var(--pink)"
          buttonGroup={buttonGroups.DISPLAY}
        />
      </div>
      <div className={styles.displayOptionFlex} id="test">
        <Button
          buttonText={`${strings.subtitles} : ${Status("subtitles")}`}
          buttonNumber={3}
          textColor="var(--pink)"
          buttonGroup={buttonGroups.DISPLAY}
        />
      </div>
      <div className={styles.displayOptionFlex} id="test">
        <Button
          buttonText={`${strings.widescreen} : ${Status("widescreen")}`}
          buttonNumber={4}
          textColor="var(--pink)"
          buttonGroup={buttonGroups.DISPLAY}
        />
      </div>
    </div>
  );
};

export default DisplayMenu;
