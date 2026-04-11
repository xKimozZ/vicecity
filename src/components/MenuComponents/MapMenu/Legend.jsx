import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import styles from "./Legend.module.css";
import { imageImports } from "../../../assets/imageImports";

const Legend = () => {
  const { selectorAbstractor } = useReduxAbstractorContext();
  const { mapSettings } = selectorAbstractor.miscState;
  const strings = selectorAbstractor.localizationState.stringMapState;

  const Entry = ({text, icon = imageImports.miscImages.controller}) => {
    return (
      <div className={styles.entry}>
        <img className={styles.icon} src={icon} />
        <span className="arborcrest arborcrestS">{text}</span>
      </div>
    );
  }
  
  return (
    <div className={styles.box}>
        <span className="pricedown pricedownM">{strings.maplegend}</span>
        <div className={styles.iconsGrid}>
        <div>
        <Entry text={"Ammu-Nation"}  />
        <Entry text={"Hardware Store"} />
        <Entry text={"Pay 'n' Spray"} />
        </div>
        <div>
        <Entry text={"Destination"} />
        <Entry text={"Player Position"} />
        </div>
        </div>
    </div>
  );
};

export default Legend;
