import { useState, useEffect } from "react";
import styles from "./Cursor.module.css";

const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min
  }  

  const generateRandomClipPath = () => {
    // Ensure the points are within the 20% range
    const x1 = getRandomNumber(0, 13);
    const y1 = getRandomNumber(0, 13);
    const x2 = getRandomNumber(87, 100);
    const y2 = getRandomNumber(0, 13);
    const x3 = getRandomNumber(87, 100);
    const y3 = getRandomNumber(87, 100);
    const x4 = getRandomNumber(0, 13);
    const y4 = getRandomNumber(87, 100);
  
    return `polygon(${x1}% ${y1}%, ${x2}% ${y2}%, ${x3}% ${y3}%, ${x4}% ${y4}%)`;
  };


const Cursor = ({ buttonRectangle }) => {
  const [positionStyle, setPositionStyle] = useState(
    {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
    }
  );
  const [clipPathStyle, setClipPathStyle] = useState({
    clipPath: generateRandomClipPath(),
});

  useEffect(()=> {
    if (buttonRectangle)
    {
        setPositionStyle({
        top: `${buttonRectangle.top * getRandomNumber(0.98,1)}%`,
        left: `${buttonRectangle.left* getRandomNumber(0.99,1)}%`,
        width: `${buttonRectangle.width* getRandomNumber(1,1.1)}%`,
        height: `${buttonRectangle.height* getRandomNumber(1,1.8)}%`,
      });
        setClipPathStyle({ clipPath: generateRandomClipPath() });
    }
  },[buttonRectangle]);

  return <div className={styles.cursorBackground} style={{...positionStyle, ...clipPathStyle}} />;
};

export default Cursor;
