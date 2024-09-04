import styles from "./BriefMenu.module.css";
import { useSelector } from "react-redux";
import { stringBriefSelector } from "../../../store/localizationSlice";

const BriefMenu = () => {
  const strings = useSelector(stringBriefSelector);
  
  return (
    <div className={styles.briefContainer}>
      {strings.intro.map((line, index) => (
        <span key={index} className={styles.briefLine}>
          {line}
        </span>
      ))}
    </div>
  );
};

export default BriefMenu;
