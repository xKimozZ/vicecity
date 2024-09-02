import { useDispatch, useSelector } from "react-redux";
import { buttonGroups } from "../../../constants/buttonGroups";
import Button from "../../Button/Button"
import styles from "./StatsMenu.module.css"
import { decrementStatsTranslate, incrementStatsTranslate, miscSelector } from "../../../store/miscSlice";
import { useEffect } from "react";
import { navigationSelector } from "../../../store/navigationSlice";

const StatsMenu = () => {
    const {statsTranslate: scroll, statsDirection} = useSelector(miscSelector);
    const {activeButtonGroup} = useSelector(navigationSelector);
    const dispatch = useDispatch();

    useEffect(()=>{
        if (activeButtonGroup === buttonGroups.STATS)
        {
            if (statsDirection === "down")
            dispatch(incrementStatsTranslate());
            else
            dispatch(decrementStatsTranslate());
        }},[activeButtonGroup]);

    useEffect(()=>{
        if (activeButtonGroup === buttonGroups.MAIN)
        {
            const timeoutId = setTimeout(() => {
                if (statsDirection === "down")
                dispatch(decrementStatsTranslate());
                else
                dispatch(incrementStatsTranslate());

            }, 500);

            return () => clearTimeout(timeoutId);
        }
    }
,[scroll, activeButtonGroup]);

    const scrollStyle = {
        transform: `translate(0px, ${scroll}px)`
    };

    return(
        <div className={styles.statsContainer}>
            <span className={styles.statsHeader}>
                Criminal Rating:
            </span>
            Upstanding Citizen [0]
            <div className={styles.statsPanel}>
                <div className={`${styles.statsFlex} ${activeButtonGroup === buttonGroups.MAIN ? styles.statsTransition : ''}
                ${ (scroll === 1000)  ? styles.cancel : ''}`}
                style={scrollStyle}>
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