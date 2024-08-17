import styles from "./Button.module.css";
import { useEffect, useState } from "react";

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

  
  const Button = ({
  buttonText = "Sample",
  hoverFunction,
  selectFunction,
  buttonNumber = 0,
  hoveredOption = 0,
  setHoveredOption,
}) => {
  const [clipPathStyle, setClipPathStyle] = useState({
    transition: 'linear 0.1s',
    clipPath: generateRandomClipPath(),
});

const isHovered = () => {
    return hoveredOption === buttonNumber;
};
useEffect(()=> {
  console.log(clipPathStyle);
},[clipPathStyle]);

const handleHover = () => {
    if ( isHovered() ) return;
    hoverFunction();
    setHoveredOption?.(buttonNumber);
    setClipPathStyle({ clipPath: generateRandomClipPath() });
  };

  return (
    <div
      className={`${styles.buttonContainer} ${
        isHovered() ? styles.buttonContainerHover : ""
      }`}
      onMouseEnter={handleHover}
      onClick={selectFunction}
      style={clipPathStyle}
    >
      {buttonText}
    </div>
  );
};

export default Button;
