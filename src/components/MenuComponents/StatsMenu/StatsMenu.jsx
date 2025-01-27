import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";
import { buttonGroups } from "../../../constants/buttonGroups";
import Button from "../../Button/Button";
import styles from "./StatsMenu.module.css";
import { useEffect, useRef, useState } from "react";


const StatsMenu = () => {
  const { dispatchAbstractor, selectorAbstractor } = useReduxAbstractorContext();
  const { miscFunctions } = dispatchAbstractor;
  const strings = selectorAbstractor.localizationState.stringStatsState;
  const { activeButtonGroup } = selectorAbstractor.navigationState;
  const { statsTranslate: scroll, statsDirection, statsLimit, lowerStatsLimit } = selectorAbstractor.miscState;
  
  const [beganScrolling, setBeganScrolling] = useState(false);
  const statsRef = useRef();

  // useEffect(()=>{
  //   const {height} = statsRef.current.getBoundingClientRect();
  //   miscFunctions.setStatsLimit(height + 30);
  // },[]);

  // Provides a smoother stop if the menu wasnt locked in but was idly scrolling
  useEffect(() => {
    if (activeButtonGroup === buttonGroups.STATS && beganScrolling) {
      if (statsDirection === "down") miscFunctions.incrementStatsTranslate();
      else miscFunctions.decrementStatsTranslate();
    } else setBeganScrolling(false);
  }, [activeButtonGroup]);

  useEffect(() => {
    if (activeButtonGroup === buttonGroups.MAIN) {
      const timeoutId = setTimeout(() => {
        setBeganScrolling(true);
        if (statsDirection === "down") miscFunctions.decrementStatsTranslate();
        else miscFunctions.incrementStatsTranslate();
      }, 15);

      return () => clearTimeout(timeoutId);
    }
  }, [scroll, activeButtonGroup]);

  const scrollStyle = {
    transform: `translate(0px, ${scroll}px)`,
  };

  return (
    <div className={styles.statsContainer}>
      <span className={styles.statsHeader}>{strings.crimra}</span>
      {strings.rating_1} [0]
      <div className={styles.statsPanel}>
        <div
          className={`${styles.statsFlex} ${
            activeButtonGroup === buttonGroups.MAIN
              ? styles.statsTransition
              : styles.statsTransition1
          }
                ${scroll >= lowerStatsLimit || scroll <= -statsLimit ? styles.cancel : ""}`}
          style={scrollStyle}
          ref={statsRef}
        >
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.percentage}</span>
            <span className={styles.statsEntryValue}>0%</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.attempts}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.playtime}</span>
            <span className={styles.statsEntryValue}>0:00</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.dayspassed}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.safehouse}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.rampages}</span>
            <span className={styles.statsEntryValue}>0{strings.outof}35</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.hidden}</span>
            <span className={styles.statsEntryValue}>0{strings.outof}100</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.youwasted}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.otherswasted}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.carsdestroyed}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.boatsdestroyed}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.aircraftdestroyed}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.tires}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.starsattained}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.starsevaded}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.busted}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.wasted}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.headshots}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.dailyspending}</span>
            <span className={styles.statsEntryValue}>${0.00}</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.criminals}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.explosives}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.fired}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.hit}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.accuracy}</span>
            <span className={styles.statsEntryValue}>0%</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.foot}</span>
            <span className={styles.statsEntryValue}>0.00</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.car}</span>
            <span className={styles.statsEntryValue}>0.00</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.bike}</span>
            <span className={styles.statsEntryValue}>0.00</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.boat}</span>
            <span className={styles.statsEntryValue}>0.00</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.golf}</span>
            <span className={styles.statsEntryValue}>0.00</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.heli}</span>
            <span className={styles.statsEntryValue}>0.00</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.totaldistance}</span>
            <span className={styles.statsEntryValue}>0.00</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.maxdist}</span>
            <span className={styles.statsEntryValue}>0.00</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.maxheight}</span>
            <span className={styles.statsEntryValue}>0.00</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.maxflip}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.unique}</span>
            <span className={styles.statsEntryValue}>0{strings.outof}36</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.maxrotation}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.bestinsane}</span>
            <span className={styles.statsEntryValue}></span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}></span>
            <span className={styles.statsEntryValue}>{strings.noinsane}</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.wheelietime}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.wheeliedist}</span>
            <span className={styles.statsEntryValue}>0.00</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.stoppietime}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.stoppiedist}</span>
            <span className={styles.statsEntryValue}>0.00</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.twowheeltime}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.twowheeldist}</span>
            <span className={styles.statsEntryValue}>0.00</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.stoppietime}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.criminals_v}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.vigilante}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.passengers}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.taxicash}</span>
            <span className={styles.statsEntryValue}>$0.00</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.peoplesaved}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.paramedic}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.fires}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.firetruck}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.stores}</span>
            <span className={styles.statsEntryValue}>0{strings.outof}15</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.assassination}</span>
            <span className={styles.statsEntryValue}>0{strings.outof}5</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.flight}</span>
            <span className={styles.statsEntryValue}>0:00</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.fish}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.mostfavorite}</span>
            <span className={styles.statsEntryValue}></span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}></span>
            <span className={styles.statsEntryValue}>FLASH FM</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.leastfavorite}</span>
            <span className={styles.statsEntryValue}></span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}></span>
            <span className={styles.statsEntryValue}>WILDSTYLE</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.sprayings}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.weapon}</span>
            <span className={styles.statsEntryValue}>$0.00</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.fashion}</span>
            <span className={styles.statsEntryValue}>$0.00</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.property}</span>
            <span className={styles.statsEntryValue}>$0.00</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.paynspray}</span>
            <span className={styles.statsEntryValue}>$0.00</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.destroyed}</span>
            <span className={styles.statsEntryValue}>$0.00</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}>{strings.media}</span>
            <span className={styles.statsEntryValue}>0</span>
          </div>
          <div className={styles.statsEntry}>
            <span className={styles.statsEntryTitle}></span>
            <span className={styles.statsEntryValue}>{strings.ignored}</span>
          </div>
        </div>
      </div>
      <div className={styles.statsBottom}>
        <Button
          buttonText={strings.back}
          buttonNumber={1}
          textColor="var(--pink)"
          buttonGroup={buttonGroups.STATS}
        />
      </div>
    </div>
  );
};

export default StatsMenu;
