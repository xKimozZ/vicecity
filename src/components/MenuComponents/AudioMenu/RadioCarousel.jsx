import styles from "./RadioCarousel.module.css";
import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import { imageImports } from "../../../assets/imageImports";
import { actionNames } from "../../../constants/actionNames";
import { useEffect, useState } from "react";
import { use } from "react";
import { buttonGroups, buttonIndices } from "../../../constants/buttonGroups";
import { useEventHandlerContext } from "../../../context/EventHandlerContext";
const {
  RADIO_ID,
  RADIO_FLASH,
  RADIO_EMOTION,
  RADIO_ESPANTOSO,
  RADIO_FEVER,
  RADIO_KCHAT,
  RADIO_VCPR,
  RADIO_WAVE,
  RADIO_VROCK,
  RADIO_WILDSTYLE,
  RADIO_LIST_START,
  RADIO_LIST_END,
} = actionNames.AUDIO;
const {DIRECTION_LEFT, DIRECTION_RIGHT} = actionNames.ARROWS;

const {AUDIO} = buttonGroups;
const {RADIO} = buttonIndices.AUDIO;

const radioIcons = {
  [RADIO_FLASH]: imageImports.radioStations.flash,
  [RADIO_EMOTION]: imageImports.radioStations.emotion,
  [RADIO_ESPANTOSO]: imageImports.radioStations.espantoso,
  [RADIO_FEVER]: imageImports.radioStations.fever,
  [RADIO_KCHAT]: imageImports.radioStations.kchat,
  [RADIO_VCPR]: imageImports.radioStations.vcpr,
  [RADIO_WAVE]: imageImports.radioStations.wave,
  [RADIO_VROCK]: imageImports.radioStations.vrock,
  [RADIO_WILDSTYLE]: imageImports.radioStations.wildstyle,
};

const RadioCarousel = () => {
  const { selectorAbstractor } = useReduxAbstractorContext();
  const { audioSettings } = selectorAbstractor.miscState;
  const { activeButtonGroup, bigHover, hoveredOption} = selectorAbstractor.navigationState;
  const { handleHover, handleSelect } = useEventHandlerContext();
  const [currentRadio, setCurrentRadio] = useState(audioSettings[RADIO_ID]);
  const [changeDirection, setChangeDirection] = useState(null); // 'left' or 'right'
  const [isChangingRadio, setIsChangingRadio] = useState(false);

  useEffect(() => {
    if (audioSettings[RADIO_ID] !== currentRadio) {
      let direction;
      if (audioSettings[RADIO_ID] === RADIO_LIST_END && currentRadio === RADIO_LIST_START) direction = "left";
      else if (audioSettings[RADIO_ID] === RADIO_LIST_START && currentRadio === RADIO_LIST_END) direction = "right";
      else direction = audioSettings[RADIO_ID] > currentRadio ? "right" : "left";

      setChangeDirection(direction);
      setIsChangingRadio(true);
    }
  }, [audioSettings[RADIO_ID], currentRadio]);

  useEffect(() => {
    if (isChangingRadio) {
      const timer = setTimeout(() => {
        setCurrentRadio(audioSettings[RADIO_ID]);
        setChangeDirection(null);
        setIsChangingRadio(false);
      }, 380); // 10ms difference seems to be perfect

      return () => clearTimeout(timer);
    }
  }, [isChangingRadio, audioSettings[RADIO_ID]]);

  const prevPrevIcon = radioIcons[(currentRadio + 7) % 9];
  const prevIcon = radioIcons[(currentRadio + 8) % 9];
  const currentIcon = radioIcons[currentRadio];
  const nextIcon = radioIcons[(currentRadio + 1) % 9];
  const nextNextIcon = radioIcons[(currentRadio + 2) % 9];
  const isActive = activeButtonGroup === AUDIO && hoveredOption === RADIO;

const EquilateralTriangle = ({ deg, position }) => {
  const handleClick = (event) => {
    event.stopPropagation();
    if (isActive && bigHover.active) {
      handleHover(position === "left" ? DIRECTION_LEFT : DIRECTION_RIGHT);
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width="120"
      height="120"
      className={`${styles.triangle} ${position === "left" ? styles.triangleLeft : styles.triangleRight}`}
      onClick={handleClick}
    >
      <polygon
        points="100,20 169.2820323027551,140 30.717967697244916,140.00000000000003"
        fill="var(--cyan)"
        stroke="#000000"
        strokeWidth="0"
        opacity="1"
        transform={`rotate(${deg}, 100, 100)`}
      />
    </svg>
  );
  };

  const handleClick = (event) => {
    event.stopPropagation();
    if (isActive ) {
      handleSelect();
    } else if (activeButtonGroup === AUDIO) handleHover(RADIO);
  };

  return (
    <div className={styles.panel} onClick={handleClick}>
      <div className={styles.panelLeft} />
      <div className={styles.panelRight} />
      <EquilateralTriangle deg={90} position="right" />
      <EquilateralTriangle deg={-90} position="left" />
      <div className={`${styles.radioList} ${changeDirection === "right" && isChangingRadio ? styles.radioSlideRight : changeDirection === "left" && isChangingRadio ? styles.radioSlideLeft : ""}`} >
        <img src={prevPrevIcon} alt="Radio Station Icon" className={styles.radioIcon} />
        <img
          src={prevIcon}
          alt="Radio Station Icon"
          className={styles.radioIcon}
        />
        <img
          src={currentIcon}
          alt="Radio Station Icon"
          className={`${styles.radioIcon} ${!isChangingRadio && styles.radioIconSelected}`}
        />
        <img
          src={nextIcon}
          alt="Radio Station Icon"
          className={styles.radioIcon}
        />
        <img
          src={nextNextIcon}
          alt="Radio Station Icon"
          className={styles.radioIcon}
        />
      </div>
    </div>
  );
};

export default RadioCarousel;
