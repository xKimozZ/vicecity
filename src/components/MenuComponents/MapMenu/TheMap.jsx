import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import { actionNames } from "../../../constants/actionNames";
import styles from "./TheMap.module.css";
import { imageImports } from "../../../assets/imageImports";
import { elementIds } from "../../../constants/elementIds";
import MapMarker from "./MapMarker";

const { ZOOM, PAN_X, PAN_Y } = actionNames.MAP;

const TheMap = ({ auxilaryStyles }) => {
  const { selectorAbstractor, dispatchAbstractor } = useReduxAbstractorContext();
  const { mapSettings } = selectorAbstractor.miscState;
  const { miscFunctions } = dispatchAbstractor;
  const { setMapSettings } = miscFunctions;
  const strings = selectorAbstractor.localizationState.stringMapState;

    
    // Map markers — modular data passed as prop to TheMap
    // Positions are percentages relative to the map grid (0-100)
    const markers = [
      { id: "player", x: 67.6, y: 84.7, type: "player" },
      { id: "ammu1", x: 43.09, y: 13.4, type: "poi", icon: imageImports.mapIcons.gun },
      { id: "ammu2", x: 72, y: 17.8, type: "poi", icon: imageImports.mapIcons.gun },
      { id: "spray1", x: 70.8, y: 34.8, type: "poi", icon: imageImports.mapIcons.spray },
      { id: "spray2", x: 37.4, y: 50.1, type: "poi", icon: imageImports.mapIcons.spray },
      { id: "spray3", x: 36.7, y: 82.4, type: "poi", icon: imageImports.mapIcons.spray },
      { id: "spray4", x: 61.6, y: 82.55, type: "poi", icon: imageImports.mapIcons.spray },
      { id: "hardware1", x: 72, y: 16.82, type: "poi", icon: imageImports.mapIcons.hardware },
      { id: "hardware2", x: 35.2, y: 66.4, type: "poi", icon: imageImports.mapIcons.hardware },
      { id: "hardware3", x: 67.35, y: 60.3, type: "poi", icon: imageImports.mapIcons.hardware },
      { id: "destination", x: 67.7, y: 85.1, type: "destination", phase: "down" },
      // { id: "tshirt1", x: 38, y: 55, type: "poi", icon: imageImports.mapIcons.tshirt },
      // { id: "save1", x: 55, y: 42, type: "poi", icon: imageImports.mapIcons.save },
      // { id: "property1", x: 65, y: 60, type: "poi", icon: imageImports.mapIcons.property },
    ];
  

  const zoom = mapSettings[ZOOM];
  const panX = mapSettings[PAN_X];
  const panY = mapSettings[PAN_Y];

  // Read --scale-factor from CSS (fallback 1)
  const scaleFactor = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--scale-factor")
  ) || 1;

  // Read --map-base-zoom from CSS (responsive base zoom, fallback 0.75)
  const mapBaseZoom = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--map-base-zoom")
  ) || 0.75;

  const effectiveScale = mapBaseZoom * zoom;
  const mapTransform = `translate(${panX}%, ${panY}%) scale(${effectiveScale})`;

  return (
    <div
      className={styles.mapBound}
      id={elementIds.FRONTEND.FRONTEND_MAP_ID}
      style={{ ...auxilaryStyles }}
    >
      <div className={`${styles.mapGrid} }`} style={{ transform: mapTransform }}>
        <img className={styles.mapCellSize} src={imageImports.gameMap.mapTop01} alt="" />
        <img className={styles.mapCellSize} src={imageImports.gameMap.mapTop02} alt="" />
        <img className={styles.mapCellSize} src={imageImports.gameMap.mapTop03} alt="" />
        <img className={styles.mapCellSize} src={imageImports.gameMap.mapMid01} alt="" />
        <img className={styles.mapCellSize} src={imageImports.gameMap.mapMid02} alt="" />
        <img className={styles.mapCellSize} src={imageImports.gameMap.mapMid03} alt="" />
        <img className={styles.mapCellSize} src={imageImports.gameMap.mapBot01} alt="" />
        <img className={styles.mapCellSize} src={imageImports.gameMap.mapBot02} alt="" />
        <img className={styles.mapCellSize} src={imageImports.gameMap.mapBot03} alt="" />

        {/* Map markers layer — positioned absolutely over the grid */}
        <div className={styles.markersLayer}>
          {markers.map((marker) => (
            <MapMarker key={marker.id} marker={marker} markerScale={1 / effectiveScale} scaleFactor={scaleFactor} strings={strings} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TheMap;
