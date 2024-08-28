import { useSelector } from "react-redux";
import { buttonGroups } from "../../../constants/buttonGroups";
import { stringSelector } from "../../../store/localizationSlice";
import Button from "../../Button/Button";
import styles from "./LoadMenu.module.css";
import { languageMap } from "../../../constants/menuStrings";
import SaveGame from "./SaveGame";
import Cursor from "../../Cursor/Cursor";

const LoadMenu = () => {
  const strings = useSelector(stringSelector);

  return (
    <div className={styles.loadContainer}>
      <div className={styles.loadButtonContainer}>
      <Button
        buttonNumber={1}
        buttonGroup={buttonGroups.LOAD}
        textColor="var(--pink)"
        buttonText={"load game"}
        actions={{}}
      />
      <Button
        buttonNumber={2}
        buttonGroup={buttonGroups.LOAD}
        textColor="var(--pink)"
        buttonText={"new game"}
        actions={{}}
      />
      </div>
      <div className={styles.loadPanel}>
        <Cursor />
        <SaveGame buttonNumber={3} />
        <SaveGame buttonNumber={4}/>
        <SaveGame buttonNumber={5}/>
        <SaveGame buttonNumber={6}/>
        <SaveGame buttonNumber={7}/>
      </div>
    </div>
  );
};

export default LoadMenu;
