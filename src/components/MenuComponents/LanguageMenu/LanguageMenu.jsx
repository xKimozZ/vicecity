import { useSelector } from "react-redux";
import { buttonGroups } from "../../../constants/buttonGroups";
import { stringSelector } from "../../../store/localizationSlice";
import Button from "../../Button/Button"
import styles from "./LanguageMenu.module.css"

const LanguageMenu = () => {
    const strings = useSelector(stringSelector);

    return(
        <div className={styles.languageContainer}>
            <Button buttonNumber={1} buttonGroup={buttonGroups.LANGUAGE} textColor="var(--pink)" buttonText={strings.language.english}/>
            <Button buttonNumber={2} buttonGroup={buttonGroups.LANGUAGE} textColor="var(--pink)" buttonText={strings.language.french}/>
            <Button buttonNumber={3} buttonGroup={buttonGroups.LANGUAGE} textColor="var(--pink)" buttonText={strings.language.german}/>
            <Button buttonNumber={4} buttonGroup={buttonGroups.LANGUAGE} textColor="var(--pink)" buttonText={strings.language.italian}/>
            <Button buttonNumber={5} buttonGroup={buttonGroups.LANGUAGE} textColor="var(--pink)" buttonText={strings.language.spanish}/>
        </div>
    )
}

export default LanguageMenu;