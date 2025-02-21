import styles from "./MapMenu.module.css";
import { imageImports } from "../../../assets/imageImports";
import menuOptions from "../../../constants/menuOptions";

const MapMenu = () => {
  
  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapBound} style={{ clipPath: menuOptions[0].frameClip }}>
        <div className={styles.mapGrid} style={{ transform: 'scale(0.75)' }}>
          <img className={styles.mapCellSize} src={imageImports.gameMap.mapTop01} />
          <img className={styles.mapCellSize} src={imageImports.gameMap.mapTop02} />
          <img className={styles.mapCellSize} src={imageImports.gameMap.mapTop03} />
          <img className={styles.mapCellSize} src={imageImports.gameMap.mapMid01} />
          <img className={styles.mapCellSize} src={imageImports.gameMap.mapMid02} />
          <img className={styles.mapCellSize} src={imageImports.gameMap.mapMid03} />
          <img className={styles.mapCellSize} src={imageImports.gameMap.mapBot01} />
          <img className={styles.mapCellSize} src={imageImports.gameMap.mapBot02} />
          <img className={styles.mapCellSize} src={imageImports.gameMap.mapBot03} />
        </div>
      </div>
    </div>
  );
};

export default MapMenu;
