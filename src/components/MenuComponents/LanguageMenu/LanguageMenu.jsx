import { buttonGroups } from "../../../constants/buttonGroups";
import Button from "../../Button/Button"
import styles from "./LanguageMenu.module.css"

const LanguageMenu = () => {
    return(
        <div className={styles.languageContainer}>
            <Button buttonNumber={1} buttonGroup={buttonGroups.LANGUAGE} textColor="var(--pink)" buttonText="English"/>
            <Button buttonNumber={2} buttonGroup={buttonGroups.LANGUAGE} textColor="var(--pink)" buttonText="French"/>
            <Button buttonNumber={3} buttonGroup={buttonGroups.LANGUAGE} textColor="var(--pink)" buttonText="Italian"/>
            <Button buttonNumber={4} buttonGroup={buttonGroups.LANGUAGE} textColor="var(--pink)" buttonText="German"/>
            <Button buttonNumber={5} buttonGroup={buttonGroups.LANGUAGE} textColor="var(--pink)" buttonText="Spanish"/>
        </div>
    )
}

export default LanguageMenu;