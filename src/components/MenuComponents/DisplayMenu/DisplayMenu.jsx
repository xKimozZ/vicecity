import { useSelector } from "react-redux";
import { buttonGroups } from "../../../constants/buttonGroups";
import { stringLanguageSelector } from "../../../store/localizationSlice";
import Button from "../../Button/Button";
import styles from "./DisplayMenu.module.css";
import { languageMap } from "../../../constants/menuStrings";
import Bar from "../../Bar/Bar";

const DisplayMenu = () => {
  const strings = useSelector(stringLanguageSelector);

  return (
    <div className={styles.displayContainer}>
      <div className={styles.displayOptionFlex} id="brightness">
        <Button
          buttonText={"brightness"}
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
          buttonText={"trails : on"}
          buttonNumber={2}
          textColor="var(--pink)"
          buttonGroup={buttonGroups.DISPLAY}
        />
      </div>
      <div className={styles.displayOptionFlex} id="test">
        <Button
          buttonText={"subtitles : on"}
          buttonNumber={3}
          textColor="var(--pink)"
          buttonGroup={buttonGroups.DISPLAY}
        />
      </div>
      <div className={styles.displayOptionFlex} id="test">
        <Button
          buttonText={"wide screen : on"}
          buttonNumber={4}
          textColor="var(--pink)"
          buttonGroup={buttonGroups.DISPLAY}
        />
      </div>
    </div>
  );
};

export default DisplayMenu;
