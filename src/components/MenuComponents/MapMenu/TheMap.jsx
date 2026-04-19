import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import menuOptions from "../../../constants/menuOptions";
import styles from "./TheMap.module.css";
import { imageImports } from "../../../assets/imageImports";
import { elementIds } from "../../../constants/elementIds";

const TheMap = ({ screenPosStyle }) => {
  const { selectorAbstractor } = useReduxAbstractorContext();
  const { mapSettings } = selectorAbstractor.miscState;
  
  return (
      <div className={styles.mapBound} id={elementIds.FRONTEND.FRONTEND_MAP_ID} style={{ clipPath: menuOptions[0].frameClip, ...screenPosStyle }}>
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
  );
};

export default TheMap;
