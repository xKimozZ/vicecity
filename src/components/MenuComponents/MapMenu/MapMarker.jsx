import styles from "./MapMarker.module.css";
import { imageImports } from "../../../assets/imageImports";
import DestinationIcon from "./DestinationIcon";

const PLAYER_TEXT_SHADOW_FACTOR = 0.07;

// Base sizes in grid-coordinate pixels.
// Screen pixels = base × scaleFactor — constant at all zoom levels.
const BASE_ARROW_SIZE = 80;
const BASE_POI_SIZE = 24;

/**
 * MapMarker component — renders a single icon on the map.
 * Position is absolute relative to the map grid (percentage-based).
 * markerScale = 1/effectiveScale cancels out the parent grid's transform,
 * keeping every marker at a constant apparent screen size regardless of zoom.
 */
const MapMarker = ({ marker, markerScale, scaleFactor, strings }) => {

  // Player marker — tip (bottom-left of container) anchored to map coordinate
  if (marker.type === "player") {
    const arrowSize = BASE_ARROW_SIZE * scaleFactor * 0.7; // arrow is slightly smaller than POIs for visual clarity
    const textSize = BASE_ARROW_SIZE * scaleFactor * 0.5275;
    const shadowPx = (textSize * PLAYER_TEXT_SHADOW_FACTOR).toFixed(2);
    return (
      <div
        className={styles.playerMarker}
        style={{
          position: "absolute",
          left: `${marker.x}%`,
          bottom: `${100 - marker.y}%`,
          display: "flex",
          alignItems: "center",
          overflow: "visible",
          pointerEvents: "none",
          transformOrigin: "0% 100%",
          transform: `scale(${markerScale})`,
        }}
      >
        <img
          src={imageImports.mapIcons.arrow}
          alt=""
          className={styles.playerMarkerArrow}
          style={{
            width: `${arrowSize}px`,
            height: `${arrowSize}px`,
            marginRight: `${arrowSize * 0.35}px`,
            filter: `drop-shadow(${arrowSize * 0.025}px ${arrowSize * 0.05}px 0px rgba(0,0,0,1))`,
            flexShrink: 0,
          }}
        />
        <div
          className={`${styles.youAreHere} pricedown`}
          style={{ fontSize: `${textSize}px`, textShadow: `${shadowPx}px ${shadowPx}px 0 #000`, letterSpacing: "-1px" }}
        >
          {strings.youAreHere}
        </div>
      </div>
    );
  }

  // Shared style for POI and destination — bottom-center anchored to map coordinate
  const size = BASE_POI_SIZE * scaleFactor;
  const baseStyle = {
    position: "absolute",
    left: `calc(${marker.x}% - ${size / 2}px)`,
    bottom: `${100 - marker.y}%`,
    width: `${size}px`,
    height: `${size}px`,
    transformOrigin: "50% 100%",
    transform: `scale(${markerScale})`,
    pointerEvents: "none",
  };

  // Destination marker — frozen SVG shape on map (phase: "square"|"up"|"down")
  if (marker.type === "destination") {
    return (
      <div style={baseStyle}>
        <DestinationIcon size={size * 2 / 3} phase={marker.phase || "square"} animated={false} />
      </div>
    );
  }

  // POI icon — uses the image from marker.icon
  return (
    <div className={styles.poiMarker} style={baseStyle}>
      <img
        src={marker.icon}
        alt=""
        style={{ width: "100%", height: "100%", imageRendering: "pixelated" }}
      />
    </div>
  );
};

export default MapMarker;
