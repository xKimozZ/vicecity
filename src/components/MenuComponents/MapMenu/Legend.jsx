import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import styles from "./Legend.module.css";
import { imageImports } from "../../../assets/imageImports";
import DestinationIcon from "./DestinationIcon";

const { mapIcons } = imageImports;

const Legend = () => {
  const { selectorAbstractor } = useReduxAbstractorContext();
  const strings = selectorAbstractor.localizationState.stringMapState;

  const col1 = [
    { text: strings.gun, icon: mapIcons.gun },
    { text: strings.hardware, icon: mapIcons.hardware },
    { text: strings.spray, icon: mapIcons.spray },
  ]

  const col2 = [
    {text: strings.destination, icon: null, isDestination: true},
    {text: strings.player, icon: mapIcons.arrow },
  ]


  const Entry = ({text, icon, isDestination = false}) => {
    return (
      <div className={styles.entry}>
        {isDestination ? (
          <div className={styles.iconBox}>
            <DestinationIcon animated={true} size={16} />
          </div>
        ) : (
          <img className={styles.icon} src={icon} />
        )}
        <span className="arborcrest arborcrestS">{text}</span>
      </div>
    );
  }
  
  return (
    <div className={styles.box}>
        <span className="pricedown pricedownM">{strings.maplegend}</span>
        <div className={styles.iconsGrid}>
        <div>
          {col1.map((entry, index) => (
            <Entry key={index} text={entry.text} icon={entry.icon} />
          ))}
        </div>
        <div>
          {col2.map((entry, index) => (
            <Entry key={index} text={entry.text} icon={entry.icon} isDestination={entry.isDestination} />
          ))}
        </div>
        </div>
    </div>
  );
};

export default Legend;
