import { imageImports } from "../../../assets/imageImports"
import styles from "./ThePad.module.css"
import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import { actionNames } from "../../../constants/actionNames";
import PadText from "./PadText";

const { MODE_CAR, MODE_ID, CONFIG_ID, CONFIG_2, CONFIG_4 } = actionNames.CONTROLS;

const ThePad = () => {
    const { selectorAbstractor } = useReduxAbstractorContext();
    const { controlsSettings } = selectorAbstractor.miscState;
    const strings = selectorAbstractor.localizationState.stringControlsState.actions;
    const { [MODE_ID]: mode, [CONFIG_ID]: config  } = controlsSettings;
    
    const notConfig2 = config !== CONFIG_2;
    const notConfig4 = config !== CONFIG_4;

    const footArrows = () => {
        return [
        notConfig2 && <img className={`${styles.ThePadArrows} ${styles.arrowsState1}`} src={imageImports.miscImages.arrows1}/>,
        <img className={`${styles.ThePadArrows} ${ notConfig2 && styles.arrowsState2}`} src={imageImports.miscImages.arrows3}/>
    ]
    };
    const vehicleArrows = () => {
        return [
        notConfig2 && <img className={`${styles.ThePadArrows} ${notConfig4 && styles.arrowsState1}`} src={imageImports.miscImages.arrows2}/>,
        notConfig4 && <img className={`${styles.ThePadArrows} ${notConfig2 && styles.arrowsState2}`} src={imageImports.miscImages.arrows4}/>
    ]
    };
    
    return(
        <div className={`${styles.padImageContainer} controllerPadHeight`}>
            <div className={styles.ThePad} >
        <img src={imageImports.miscImages.controller}/>
        { mode === MODE_CAR ? vehicleArrows() : footArrows() }
        <PadText mode={mode} strings={strings} config={config}/>
            </div>
        </div>
    )
}

export default ThePad;