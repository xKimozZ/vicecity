import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import { useEventHandlerContext } from "../../../context/EventHandlerContext";
import styles from "./MapMenu.module.css";
import { buttonGroups, buttonIndices } from "../../../constants/buttonGroups";
import { actionNames } from "../../../constants/actionNames";
import ColumnedList from "../../ColumnedList/ColumnedList";
import TheMap from "./TheMap";

const MapMenu = () => {
  const { selectorAbstractor } = useReduxAbstractorContext();
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
      <ColumnedList items={legendData} />
    </div>
  );
};

export default MapMenu;
