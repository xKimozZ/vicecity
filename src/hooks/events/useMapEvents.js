import { useReduxAbstractorContext } from "../../context/ReduxAbstractorContext";
import { actionNames } from "../../constants/actionNames";
import useSoundManager from "../useSoundManager";

const { HOVER, SELECT, BACK, SPECIAL } = actionNames.GENERAL;
const { LEGEND_ID } = actionNames.MAP;

const useMapEvents = () => {

    const { playSelect } = useSoundManager();

  const { selectorAbstractor } = useReduxAbstractorContext();
  const { dispatchAbstractor } = useReduxAbstractorContext();
  const { miscState } = selectorAbstractor;
  const {mapSettings} = miscState;
  const { miscFunctions } = dispatchAbstractor;
  const { setMapSettings } = miscFunctions;
  const { bigHover, currentActions } = selectorAbstractor.navigationState;

  const hoverCase = (direction) => {

  };

  const handleMap = (eventType, param) => {
    switch (eventType) {
      case SELECT:
        setMapSettings({...mapSettings, [LEGEND_ID]: !mapSettings[LEGEND_ID]});
        playSelect();
        break;
      case HOVER:
        hoverCase(param);
        break;
      case SPECIAL:
        break;
      case BACK:
      default:
        break;
    }
  };

  return { handleMap };
};

export default useMapEvents;
