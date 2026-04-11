import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import { useEventHandlerContext } from "../../../context/EventHandlerContext";
import styles from "./MapMenu.module.css";
import { buttonGroups, buttonIndices } from "../../../constants/buttonGroups";
import { actionNames } from "../../../constants/actionNames";
import ColumnedList from "../../ColumnedList/ColumnedList";
import Legend from "./Legend";

  const MAP_CURSOR_FACTORS = {
  clipFactor: 4,
  topFactor: 1.007,
  maxTopFactor: 1.01,
  leftFactor: 1.08,
  maxLeftFactor: 1.09,
  minWidthFactor: 0.81,
  widthFactor: 0.87,
  minHeightFactor: 1,
  heightFactor: 1.03,
};

const MapMenu = () => {
  const { selectorAbstractor } = useReduxAbstractorContext();
  const { mapSettings } = selectorAbstractor.miscState;
  const strings = selectorAbstractor.localizationState.stringMapState;

  const Status = (key) => {
    return mapSettings[key] ? strings.on : strings.off;
  };

  const legendData = [
    { stringKey: "legend", buttonNumber: buttonIndices.MAP.LEGEND, buttonGroup: buttonGroups.MAP, id: actionNames.MAP.LEGEND_ID, isTwoStaged: false, dependencies: mapSettings[actionNames.MAP.LEGEND_ID], getStatusString: Status, getOptionTextString: (key) => strings[key], cursorFactors: MAP_CURSOR_FACTORS },
  ];

  
  return (
    <div className={styles.mapContainer}>
      <div className={styles.legendBoxAlign}>
        { mapSettings[actionNames.MAP.LEGEND_ID] && <Legend /> }
      </div>
      <div className={styles.legendButtonAlign}>
      <ColumnedList items={legendData} />
      </div>
    </div>
  );
};

export default MapMenu;
