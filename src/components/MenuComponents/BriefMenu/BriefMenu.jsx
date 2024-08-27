import styles from "./BriefMenu.module.css"

const BriefMenu = () => {
    return(
        <div className={styles.briefContainer}>
            <span className={styles.briefLine}>
            Go get some sleep.
            </span>
            <span className={styles.briefLine}>
            What are you gonna do?
            </span>
            <span className={styles.briefLine}>
            I'll drop by your office tomorrow and we can start sorting this mess out.
            </span>
        </div>
    )
}

export default BriefMenu;