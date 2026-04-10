import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import { useEventHandlerContext } from "../../../context/EventHandlerContext";
import menuOptions from "../../../constants/menuOptions";
import styles from "./MapMenu.module.css";
import { imageImports } from "../../../assets/imageImports";
import { buttonGroups, buttonIndices } from "../../../constants/buttonGroups";
import { actionNames } from "../../../constants/actionNames";
import ColumnedList from "../../ColumnedList/ColumnedList";

const MapMenu = () => {
  const { selectorAbstractor } = useReduxAbstractorContext();
  const { handleHover, handleBack } = useEventHandlerContext();
  const { mapSettings } = selectorAbstractor.miscState;
  const strings = selectorAbstractor.localizationState.stringMapState;

  const Status = (key) => {
    return mapSettings[key] ? strings.on : strings.off;
  };

  const legendData = [
    { stringKey: "legend", buttonNumber: buttonIndices.MAP.LEGEND, buttonGroup: buttonGroups.MAP, id: actionNames.MAP.LEGEND_ID, isTwoStaged: false, dependencies: mapSettings[actionNames.MAP.LEGEND_ID], getStatusString: Status, getOptionTextString: (key) => strings[key] },
  ];

  
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
      <ColumnedList items={legendData} />
    </div>
  );
};

export default MapMenu;
