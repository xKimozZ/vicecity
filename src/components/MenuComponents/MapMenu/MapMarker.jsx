import styles from "./MapMarker.module.css";
import { imageImports } from "../../../assets/imageImports";
import DestinationIcon from "./DestinationIcon";

// Tweak in 0.01 steps — scales text-shadow offset relative to text size
const PLAYER_TEXT_SHADOW_FACTOR = 0.07;

/**
 * MapMarker component — renders a single icon on the map.
 * Position is absolute relative to the map grid (percentage-based).
 * Size scales inversely with zoom for general-area-to-precise effect.
 */
const MapMarker = ({ marker, zoom, scaleFactor, strings }) => {
  const iconScale = Math.max(0.5, 1.4 / zoom);
  const baseSize = 25 * scaleFactor * iconScale;

  const markerStyle = {
    position: "absolute",
    left: `${marker.x}%`,
    top: `${marker.y}%`,
    width: `${baseSize}px`,
    height: `${baseSize}px`,
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
  };

  // Player marker — apparent size stays constant on screen by dividing by zoom
  // (markers are inside the scaled map grid, so jsSize × effectiveScale = screen size)
  // zoom=1: arrow=105*sf, text=48*sf  |  zoom=3: arrow≈35*sf, text≈16*sf
  if (marker.type === "player") {
    const arrowSize = (120 * scaleFactor) / zoom;
    const textSize = (120 * scaleFactor * 0.5275) / zoom;
    const shadowPx = (textSize * PLAYER_TEXT_SHADOW_FACTOR).toFixed(2);
    const playerStyle = {
      position: "absolute",
      left: `${marker.x}%`,
      bottom: `${100 - marker.y}%`,
      height: `${arrowSize}px`,
      display: "flex",
      alignItems: "center",
      overflow: "visible",
      pointerEvents: "none",
    };
    return (
      <div style={playerStyle} className={styles.playerMarker}>
        <img
          src={imageImports.mapIcons.arrow}
          alt=""
          className={styles.playerMarkerArrow}
          style={{ width: `${arrowSize}px`, height: `${arrowSize}px`, imageRendering: "pixelated", flexShrink: 0 }}
        />
        <div
          className={`${styles.youAreHere} pricedown`}
          style={{ fontSize: `${textSize}px`, textShadow: `${shadowPx}px ${shadowPx}px 0 #000`, letterSpacing: `${(-1 + (zoom - 1) * 0.25).toFixed(2)}px` }}
        >
          {strings.youAreHere}
        </div>
      </div>
    );
  }

  // Destination marker — frozen SVG shape on map (phase: "square"|"up"|"down")
  if (marker.type === "destination") {
    return (
      <div style={{ ...markerStyle, width: `${baseSize}px`, height: `${baseSize}px` }}>
        <DestinationIcon size={baseSize / 3 * 2} phase={marker.phase || "square"} animated={false} />
      </div>
    );
  }

  // POI icon — uses the image from marker.icon
  return (
    <div className={styles.poiMarker} style={markerStyle}>
      <img
        src={marker.icon}
        alt=""
        style={{ width: "100%", height: "100%", imageRendering: "pixelated" }}
      />
    </div>
  );
};

export default MapMarker;
