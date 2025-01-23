import { useSelector } from "react-redux";
import { buttonGroups } from "../../../constants/buttonGroups";
import { stringLoadSelector } from "../../../store/localizationSlice";
import Button from "../../Button/Button";
import styles from "./LoadMenu.module.css";
import SaveGame from "./SaveGame";
import Cursor from "../../Cursor/Cursor";
import { actionNames } from "../../../constants/actionNames";

const LoadMenu = () => {
  const strings = useSelector(stringLoadSelector);

  return (
    <div className={styles.loadContainer}>
      <div className={styles.loadButtonContainer}>
      <div className={styles.loadButton}>
      <Button
        buttonNumber={1}
        buttonGroup={buttonGroups.LOAD}
        textColor="var(--pink)"
        buttonText={strings.loadgame}
        actions={{trigger: actionNames.LOAD.LOADGAME }}
      />
      </div>
      <div className={styles.loadButton}>
      <Button
        buttonNumber={2}
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
          <SaveGame buttonNumber={3} slotNumber={1} saveFile={{name: "In the beginning...", date: new Date("2002-10-26 18:46:13")}}/>
          <SaveGame buttonNumber={4} slotNumber={2}/>
          <SaveGame buttonNumber={5} slotNumber={3}/>
          <SaveGame buttonNumber={6} slotNumber={4} saveFile={{name: "All Hands on Deck!", date: new Date("2003-7-6 16:32:07")}}/>
          <SaveGame buttonNumber={7} slotNumber={5}/>
          <SaveGame buttonNumber={8} slotNumber={6} saveFile={{name: "Cap the Collector", date: new Date("2019-12-31 23:48:59")}}/>
          <SaveGame buttonNumber={9} slotNumber={7} saveFile={{name: "Keep your Friends Close...", date: new Date("2000-1-1 09:17:48")}}/>
          <SaveGame buttonNumber={10} slotNumber={8}/>
        </div>
      </div>
    </div>
  );
};

export default LoadMenu;
