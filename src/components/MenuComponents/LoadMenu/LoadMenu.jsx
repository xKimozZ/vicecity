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
        actions={{trigger: "loadGame"}}
      />
      <Button
        buttonNumber={2}
        buttonGroup={buttonGroups.LOAD}
        textColor="var(--pink)"
        buttonText={"new game"}
        actions={{trigger: "newGame"}}
      />
      </div>
      <div className={styles.loadPanel}>
        <div className={styles.loadFlex}>
          <Cursor />
          <SaveGame buttonNumber={3} slotNumber={1} saveFile={{name: "In the beginning...", date: Date()}}/>
          <SaveGame buttonNumber={4} slotNumber={2}/>
          <SaveGame buttonNumber={5} slotNumber={3}/>
          <SaveGame buttonNumber={6} slotNumber={4}/>
          <SaveGame buttonNumber={7} slotNumber={5}/>
          <SaveGame buttonNumber={8} slotNumber={6}/>
          <SaveGame buttonNumber={9} slotNumber={7}/>
          <SaveGame buttonNumber={10} slotNumber={8}/>
        </div>
      </div>
    </div>
  );
};

export default LoadMenu;
