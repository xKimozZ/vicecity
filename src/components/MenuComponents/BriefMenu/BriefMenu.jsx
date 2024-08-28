import styles from "./BriefMenu.module.css";
import { useSelector } from "react-redux";
import { stringSelector } from "../../../store/localizationSlice";

const BriefMenu = () => {
  const strings = useSelector(stringSelector);

  return (
    <div className={styles.briefContainer}>
      {strings.brief.intro.map((line, index) => (
        <span key={index} className={styles.briefLine}>
          {line}
        </span>
      ))}
    </div>
  );
};

export default BriefMenu;
