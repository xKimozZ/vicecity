import styles from "./BriefMenu.module.css";
import { useReduxAbstractorContext } from "../../../context/ReduxAbstractorContext";

const BriefMenu = () => {
  const { selectorAbstractor } = useReduxAbstractorContext();
  const {briefKey} = selectorAbstractor.miscState;
  const strings = selectorAbstractor.localizationState.stringBriefState;

  return (
    <div className={styles.briefContainer}>
      {strings[briefKey].map((line, index) => (
        <span key={index} className={styles.briefLine}>
          {line}
        </span>
      ))}
    </div>
  );
};

export default BriefMenu;
