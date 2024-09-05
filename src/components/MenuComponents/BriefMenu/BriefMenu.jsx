import styles from "./BriefMenu.module.css";
import { useSelector } from "react-redux";
import { stringBriefSelector } from "../../../store/localizationSlice";
import { miscSelector } from "../../../store/miscSlice";

const BriefMenu = () => {
  const {briefKey} = useSelector(miscSelector);
  const strings = useSelector(stringBriefSelector);

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
