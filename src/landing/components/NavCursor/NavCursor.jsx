import { useMemo } from "react";
import styles from "./NavCursor.module.css";

const generateClipPath = (jitter = 3) => {
  const rand = (base, variance) => base + (Math.random() * variance * 2 - variance);
  
  const x1 = rand(0, jitter);
  const y1 = rand(0, jitter);
  const x2 = rand(100, jitter);
  const y2 = rand(0, jitter);
  const x3 = rand(100, jitter);
  const y3 = rand(100, jitter);
  const x4 = rand(0, jitter);
  const y4 = rand(100, jitter);

  return `polygon(${x1}% ${y1}%, ${x2}% ${y2}%, ${x3}% ${y3}%, ${x4}% ${y4}%)`;
};

const NavCursor = ({ style }) => {
  const clipPath = useMemo(() => {
    if (!style) return "";
    return generateClipPath(4);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [style?.left, style?.top]);

  if (!style) return null;

  return (
    <div
      className={styles.cursor}
      style={{
        left: style.left,
        top: style.top,
        width: style.width,
        height: style.height,
        clipPath,
      }}
    />
  );
};

export default NavCursor;
