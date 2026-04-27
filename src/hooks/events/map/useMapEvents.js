import { actionNames } from "../../../constants/actionNames";
import useMapGenerics from "./useMapGenerics";

const { HOVER, SELECT, BACK, SPECIAL } = actionNames.GENERAL;
const { LEGEND_ID } = actionNames.MAP;

const useMapEvents = (globalHookFunctions) => {
  const { playSelect } = globalHookFunctions;
  const { panMap, zoomMap, mapSettingsRef, setMapSettings } = useMapGenerics();

  const handleMap = (eventType, param) => {
    switch (eventType) {
      case SELECT:
        setMapSettings({ ...mapSettingsRef.current, [LEGEND_ID]: !mapSettingsRef.current[LEGEND_ID] });
        playSelect();
        break;
      case HOVER:
        panMap(param);
        break;
      case SPECIAL:
        zoomMap(param);
        break;
      case BACK:
      default:
        break;
    }
  };

  return { handleMap };
};

export default useMapEvents;
