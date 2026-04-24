import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import { actionNames } from "../../../constants/actionNames";
import { useRef, useEffect } from "react";

const { ZOOM, PAN_X, PAN_Y } = actionNames.MAP;
const {
  DIRECTION_UP, DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT,
  DIRECTION_UP_RIGHT, DIRECTION_UP_LEFT, DIRECTION_DOWN_RIGHT, DIRECTION_DOWN_LEFT,
} = actionNames.ARROWS;

const MAP_ZOOM_MIN = 1;
const MAP_ZOOM_MAX = 5;
const MAP_ZOOM_STEP = 0.15;
const MAP_PAN_STEP = 3; // percentage per tick

// How far you can pan at a given zoom level (percentage of map)
const getMaxPan = (zoom) => (zoom - 1) * 40;

// Prevent from getting over or under boundary
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const useMapGenerics = () => {
  const { selectorAbstractor, dispatchAbstractor } = useReduxAbstractorContext();
  const { mapSettings } = selectorAbstractor.miscState;
  const { setMapSettings } = dispatchAbstractor.miscFunctions;

  // Ref tracks latest mapSettings to avoid stale reads during rapid key events (diagonal)
  const mapSettingsRef = useRef(mapSettings);
  useEffect(() => { mapSettingsRef.current = mapSettings; }, [mapSettings]);

  const panMap = (direction) => {
    const current = mapSettingsRef.current;
    const zoom = current[ZOOM];
    // No panning at minimum zoom
    if (zoom <= MAP_ZOOM_MIN) return;

    const maxPan = getMaxPan(zoom);
    let newPanX = current[PAN_X];
    let newPanY = current[PAN_Y];

    switch (direction) {
      case DIRECTION_UP:
        newPanY = clamp(newPanY + MAP_PAN_STEP, -maxPan, maxPan);
        break;
      case DIRECTION_DOWN:
        newPanY = clamp(newPanY - MAP_PAN_STEP, -maxPan, maxPan);
        break;
      case DIRECTION_LEFT:
        newPanX = clamp(newPanX + MAP_PAN_STEP, -maxPan, maxPan);
        break;
      case DIRECTION_RIGHT:
        newPanX = clamp(newPanX - MAP_PAN_STEP, -maxPan, maxPan);
        break;
      case DIRECTION_UP_RIGHT:
        newPanY = clamp(newPanY + MAP_PAN_STEP, -maxPan, maxPan);
        newPanX = clamp(newPanX - MAP_PAN_STEP, -maxPan, maxPan);
        break;
      case DIRECTION_UP_LEFT:
        newPanY = clamp(newPanY + MAP_PAN_STEP, -maxPan, maxPan);
        newPanX = clamp(newPanX + MAP_PAN_STEP, -maxPan, maxPan);
        break;
      case DIRECTION_DOWN_RIGHT:
        newPanY = clamp(newPanY - MAP_PAN_STEP, -maxPan, maxPan);
        newPanX = clamp(newPanX - MAP_PAN_STEP, -maxPan, maxPan);
        break;
      case DIRECTION_DOWN_LEFT:
        newPanY = clamp(newPanY - MAP_PAN_STEP, -maxPan, maxPan);
        newPanX = clamp(newPanX + MAP_PAN_STEP, -maxPan, maxPan);
        break;
      default:
        break;
    }

    const newSettings = { ...current, [PAN_X]: newPanX, [PAN_Y]: newPanY };
    mapSettingsRef.current = newSettings;
    setMapSettings(newSettings);
  };

  const zoomMap = (direction) => {
    const current = mapSettingsRef.current;
    const currentZoom = current[ZOOM];
    let newZoom = currentZoom;

    if (direction === "zoomIn") {
      newZoom = Math.min(currentZoom + MAP_ZOOM_STEP, MAP_ZOOM_MAX);
    } else if (direction === "zoomOut") {
      newZoom = Math.max(currentZoom - MAP_ZOOM_STEP, MAP_ZOOM_MIN);
    }

    // When zooming out, clamp pan to new limits
    const maxPan = getMaxPan(newZoom);
    const newPanX = clamp(current[PAN_X], -maxPan, maxPan);
    const newPanY = clamp(current[PAN_Y], -maxPan, maxPan);

    const newSettings = { ...current, [ZOOM]: newZoom, [PAN_X]: newPanX, [PAN_Y]: newPanY };
    mapSettingsRef.current = newSettings;
    setMapSettings(newSettings);
  };

  return { panMap, zoomMap, mapSettingsRef, setMapSettings };
};

export default useMapGenerics;
