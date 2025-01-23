import React, { useState, useEffect } from "react";
import styles from "./Bar.module.css";

const Bar = ({ filledBars = 0.6, barCount = 16 }) => {
  const [levels, setLevels] = useState([]);
  
  const [filled, setFilled] = useState();

  useEffect(() => {
    const f = Math.round(filledBars * 16);

    setFilled(f);
  },[filledBars]);
  
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
            backgroundColor: index < filled ? "#61c2f7" : "#1b5982",
          }}
        />
      ))}
    </div>
  );
};

export default Bar;
