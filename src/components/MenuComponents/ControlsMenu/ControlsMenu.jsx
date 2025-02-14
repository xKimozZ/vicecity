import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import styles from "./ControlsMenu.module.css";
import ColumnedList from "../../ColumnedList/ColumnedList";
import { buttonGroups, buttonIndices } from "../../../constants/buttonGroups";
import { actionNames } from "../../../constants/actionNames";

const { CONFIG, MODE, VIB, FP } = buttonIndices.CONTROLS;
const { CONFIG_ID, MODE_ID, VIB_ID, FP_ID,
        CONFIG_1, CONFIG_2, CONFIG_3, CONFIG_4, MODE_CAR, MODE_FOOT } = actionNames.CONTROLS;

const RADAR_CURSOR_FACTORS = {
  clipFactor: 7,
  topFactor: 1,
  leftFactor: 1,
  maxLeftFactor: 1.03,
  widthFactor: 1.01,
  minHeightFactor: 1.12,
  heightFactor: 1.18,
};

const ControlsMenu = () => {
  const { selectorAbstractor } = useReduxAbstractorContext();
  const { controlsSettings } = selectorAbstractor.miscState;
  const strings = selectorAbstractor.localizationState.stringControlsState;

  const Status = (key) => {
    if (key === CONFIG_ID) {
      switch (controlsSettings[CONFIG_ID]) {
        case CONFIG_1:
          return strings.setup1;
        case CONFIG_2:
          return strings.setup2;
        case CONFIG_3:
          return strings.setup3;
        case CONFIG_4:
          return strings.setup4;
      }
    };

    if (key === MODE_ID)
      switch (controlsSettings[MODE_ID]) {
        case MODE_CAR:
          return strings.incar;
        case MODE_FOOT:
          return strings.onfoot;
      };

    return controlsSettings[key] ? strings.on : strings.off;
  };

  const conf = [
    { stringKey: "configuration", buttonNumber: CONFIG, buttonGroup: buttonGroups.CONTROLS, id: CONFIG_ID, isTwoStaged: true, dependencies: controlsSettings[CONFIG_ID], getStatusString: Status, getOptionTextString: (key) => strings[key], cursorFactors: RADAR_CURSOR_FACTORS },
  ];
  
  const mode = [
    { stringKey: "mode", buttonNumber: MODE, buttonGroup: buttonGroups.CONTROLS, id: MODE_ID, isTwoStaged: false, dependencies: controlsSettings[MODE_ID], getStatusString: Status, getOptionTextString: (key) => strings[key], cursorFactors: RADAR_CURSOR_FACTORS },
  ];

  const vib = [
    { stringKey: "vibration", buttonNumber: VIB, buttonGroup: buttonGroups.CONTROLS, id: VIB_ID, isTwoStaged: false, dependencies: controlsSettings[VIB_ID], getStatusString: Status, getOptionTextString: (key) => strings[key], cursorFactors: RADAR_CURSOR_FACTORS },
  ];

  const fp = [
    { stringKey: "invert", buttonNumber: FP, buttonGroup: buttonGroups.CONTROLS, id: FP_ID, isTwoStaged: false, dependencies: controlsSettings[FP_ID], getStatusString: Status, getOptionTextString: (key) => strings[key], cursorFactors: RADAR_CURSOR_FACTORS },
  ];
  
  return (
    <div className={styles.controlsContainer}>
      <ColumnedList items={conf} />
      <ColumnedList items={mode} />
      <ColumnedList items={vib} />
      <ColumnedList items={fp} />
    </div>
  );
};

export default ControlsMenu;
