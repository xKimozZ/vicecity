import styles from "./DestinationIcon.module.css";

/**
 * DestinationIcon — SVG that cycles through square → triangle up → triangle down.
 * animated=true: cycles (for Legend). animated=false: frozen at `phase` shape (for map).
 * All three paths share the same M+L+L+L+Z structure so d-property animation is valid.
 */
const DestinationIcon = ({ animated = false, phase = "square", size = 16 }) => {
  const pathClass = animated
    ? styles.destAnimated
    : { square: styles.destSquare, up: styles.destUp, down: styles.destDown }[phase];
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" overflow="visible" style={{ display: "block" }}>
      <path
        className={`${styles.destPath} ${pathClass}`}
        fill="var(--magenta)"
        stroke="black"
        strokeWidth="2"
        strokeLinejoin="miter"
      />
    </svg>
  );
};

export default DestinationIcon;
