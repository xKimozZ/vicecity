import styles from "./PadText.module.css"
import { actionNames } from "../../../constants/actionNames";

const { MODE_CAR } = actionNames.CONTROLS;

const PadText = ({strings, mode}) => {
    const L1Style = {top: "23%", left: "10%"};

    const label = (posStyle, text) => <label style={{position:"absolute", ...posStyle}}>{text}</label>
    return(
        <div className={`${styles.padTextContainer} arborcrest arborcrestXS`}>
        {label(L1Style,"L1 Buttonnndiodod")}
        </div>
    )
}

export default PadText;