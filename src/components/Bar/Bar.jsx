import React, { useState, useEffect } from "react";
import styles from "./Bar.module.css";

const Bar = ({ barCount = 16 }) => {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const generatedLevels = Array.from({ length: barCount }, (_, index) => {
      return 24 + (index) * (6); // Trend-like increasing heights
    });
    setLevels(generatedLevels);
  }, [barCount]);

  return (
    <div className={styles.soundBarContainer}>
      {levels.map((level, index) => (
        <div
          key={index}
          className={styles.bar}
          style={{
            height: `${level}px`, // Set height based on the generated levels
          }}
        />
      ))}
    </div>
  );
};

export default Bar;
