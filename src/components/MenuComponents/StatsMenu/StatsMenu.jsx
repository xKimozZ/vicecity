import { buttonGroups } from "../../../constants/buttonGroups";
import Button from "../../Button/Button"
import styles from "./StatsMenu.module.css"

const StatsMenu = () => {
    return(
        <div className={styles.statsContainer}>
            <span className={styles.statsHeader}>
                Criminal Rating:
            </span>
            Upstanding Citizen [0]
            <div className={styles.statsPanel}>
                <div className={styles.statsFlex}>
                <span className={styles.statsEntry}>
                Yo yo yo
                </span>
                <span className={styles.statsEntry}>
                Yo yo yo
                </span>
                <span className={styles.statsEntry}>
                Yo yo yo
                </span>
                <span className={styles.statsEntry}>
                Yo yo yo
                </span>
                <span className={styles.statsEntry}>
                Yo yo yo
                </span>
                <span className={styles.statsEntry}>
                Yo yo yo
                </span>
                <span className={styles.statsEntry}>
                Yo yo yo
                </span><span className={styles.statsEntry}>
                Yo yo yo
                </span>
                <span className={styles.statsEntry}>
                Yo yo yo
                </span><span className={styles.statsEntry}>
                Yo yo yo
                </span><span className={styles.statsEntry}>
                Yo yo yo
                </span><span className={styles.statsEntry}>
                Yo yo yo
                </span><span className={styles.statsEntry}>
                Yo yo yo
                </span><span className={styles.statsEntry}>
                Yo yo yo
                </span><span className={styles.statsEntry}>
                Yo yo yo
                </span><span className={styles.statsEntry}>
                Yo yo yo
                </span><span className={styles.statsEntry}>
                Yo yo yo
                </span><span className={styles.statsEntry}>
                Yo yo yo
                </span><span className={styles.statsEntry}>
                Yo yo yo
                </span><span className={styles.statsEntry}>
                Yo yo yo
                </span><span className={styles.statsEntry}>
                Yo yo yo
                </span>
                </div>
            </div>
            <div className={styles.statsBottom}>
                <Button buttonText="back" buttonNumber={1} textColor="var(--pink)" buttonGroup={buttonGroups.STATS} 
                actions={{triggerMenu: buttonGroups.MAIN}}/>
            </div>
        </div>
    )
}

export default StatsMenu;