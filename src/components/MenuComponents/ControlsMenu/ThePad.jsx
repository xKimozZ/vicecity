import { imageImports } from "../../../assets/imageImports"
import styles from "./ThePad.module.css"
import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import { actionNames } from "../../../constants/actionNames";
import PadText from "./PadText";

const { MODE_CAR } = actionNames.CONTROLS;

const ThePad = () => {
    const { selectorAbstractor } = useReduxAbstractorContext();
    const { controlsSettings } = selectorAbstractor.miscState;
    const strings = selectorAbstractor.localizationState.stringControlsState.actions;
    const { mode } = controlsSettings;

    const footArrows = () => {
        return [<img className={`${styles.ThePad} ${styles.arrowsState1}`} src={imageImports.miscImages.arrows1}/>,<img className={`${styles.ThePad} ${styles.arrowsState2}`} src={imageImports.miscImages.arrows3}/>]
    };
    const vehicleArrows = () => {
        return [<img className={`${styles.ThePad} ${styles.arrowsState1}`} src={imageImports.miscImages.arrows2}/>,<img className={`${styles.ThePad} ${styles.arrowsState2}`} src={imageImports.miscImages.arrows4}/>]
    };
    
    return(
        <div className={styles.padImageContainer}>
        <img className={styles.ThePad} src={imageImports.miscImages.controller}/>
        { mode === MODE_CAR ? vehicleArrows() : footArrows() }
        <PadText />
        </div>
    )
}

export default ThePad;