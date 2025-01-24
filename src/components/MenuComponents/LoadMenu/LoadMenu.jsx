import { useSelector } from "react-redux";
import { buttonGroups, buttonIndices } from "../../../constants/buttonGroups";
import { stringLoadSelector } from "../../../store/localizationSlice";
import Button from "../../Button/Button";
import styles from "./LoadMenu.module.css";
import SaveGame from "./SaveGame";
import Cursor from "../../Cursor/Cursor";
import { actionNames } from "../../../constants/actionNames";

const {
  LOAD_GAME,
  NEW_GAME,
  SAVE_SLOT_1,
  SAVE_SLOT_2,
  SAVE_SLOT_3,
  SAVE_SLOT_4,
  SAVE_SLOT_5,
  SAVE_SLOT_6,
  SAVE_SLOT_7,
  SAVE_SLOT_8,
} = buttonIndices.LOAD;

const LoadMenu = () => {
  const strings = useSelector(stringLoadSelector);

  return (
    <div className={styles.loadContainer}>
      <div className={styles.loadButtonContainer}>
      <div className={styles.loadButton}>
      <Button
        buttonNumber={LOAD_GAME}
        buttonGroup={buttonGroups.LOAD}
        textColor="var(--pink)"
        buttonText={strings.loadgame}
        actions={{trigger: actionNames.LOAD.LOADGAME }}
      />
      </div>
      <div className={styles.loadButton}>
      <Button
        buttonNumber={NEW_GAME}
        buttonGroup={buttonGroups.LOAD}
        textColor="var(--pink)"
        buttonText={strings.newgame}
        actions={{trigger: actionNames.LOAD.NEWGAME }}
      />
      </div>
      </div>
      <div className={styles.loadPanel}>
        <div className={styles.loadFlex}>
          <Cursor />
          <SaveGame buttonNumber={SAVE_SLOT_1} slotNumber={1} saveFile={{name: "In the beginning...", date: new Date("2002-10-26 18:46:13")}}/>
          <SaveGame buttonNumber={SAVE_SLOT_2} slotNumber={2}/>
          <SaveGame buttonNumber={SAVE_SLOT_3} slotNumber={3}/>
          <SaveGame buttonNumber={SAVE_SLOT_4} slotNumber={4} saveFile={{name: "All Hands on Deck!", date: new Date("2003-7-6 16:32:07")}}/>
          <SaveGame buttonNumber={SAVE_SLOT_5} slotNumber={5}/>
          <SaveGame buttonNumber={SAVE_SLOT_6} slotNumber={6} saveFile={{name: "Cap the Collector", date: new Date("2019-12-31 23:48:59")}}/>
          <SaveGame buttonNumber={SAVE_SLOT_7} slotNumber={7} saveFile={{name: "Keep your Friends Close...", date: new Date("2000-1-1 09:17:48")}}/>
          <SaveGame buttonNumber={SAVE_SLOT_8} slotNumber={8}/>
        </div>
      </div>
    </div>
  );
};

export default LoadMenu;
